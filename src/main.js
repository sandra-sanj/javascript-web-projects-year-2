import {restaurantRow} from './components/restaurant.js';
import {
  defaultCoordinates,
  highlightClass,
  closestRestaurantClass,
  notAvailableId,
  removeClassFromAllElements,
  addClassToElement,
  removeClassFromElement,
  hideElement,
  showElement,
} from './utils/variables.js';
import {getRestaurants, getCurrentUserByToken, putUser} from './api/api.js';
import {
  renderModalContent,
  highlightModalMenuItem,
  initializeModalEventListeners,
} from './components/restaurant-modal.js';
import {getFilterOrderedList} from './components/filters.js';
import {renderNav} from './components/nav.js';
import {renderMapMarkers, renderMap} from './components/map.js';

let filteredRestaurants = [];
let selectedRestaurant;

// login token
const token = localStorage.getItem('token');

// map
let selfCoordinates;

// get location
const locationElement = document.getElementById('location');
let map;
const restaurantMarkers = L.layerGroup();

const calculateDistanceTo = (lon1, lat1, lon2, lat2) => {
  return Math.sqrt((lat2 - lat1) ** 2 + (lon2 - lon1) ** 2) * 111;
};

const getClosestRestaurant = (restaurants) => {
  // sort restaurants array by distance in ascending order
  const sortedRestaurants = [...restaurants].sort(
    (r1, r2) => r1.distance - r2.distance
  );
  return sortedRestaurants[0];
};

const addDistanceToRestaurants = (restaurants) => {
  // filter array from any entries without any location data
  const validRestaurants = restaurants.filter(
    (r) => r?.location?.coordinates?.length == 2
  );
  //console.log('restaurants with valid location data', validRestaurants);

  // map array and add distance variable
  const mappedRestaurants = validRestaurants.map((restaurant) => {
    const [rLongitude, rLatitude] = restaurant.location.coordinates;
    const distance = calculateDistanceTo(
      selfCoordinates.longitude,
      selfCoordinates.latitude,
      rLongitude,
      rLatitude
    );
    return {...restaurant, distance: distance};
  });
  //console.log('restaurants with distances', mappedRestaurants);

  return mappedRestaurants;
};

const locationSuccess = (position) => {
  selfCoordinates = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  //console.log(selfCoordinates);

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  locationElement.innerText = `Coordinates: ${latitude.toFixed(
    5
  )}, ${longitude.toFixed(5)}`;
  continueAfterLocation();
};

const locationError = () => {
  locationElement.innerText =
    'Sorry, no position available. Using default location';
  selfCoordinates = defaultCoordinates;
  continueAfterLocation();
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
  } else {
    locationElement.innerText = 'Geolocation is not supported by this browser.';
  }
};

// get current favorite restaurant id
let userFavoriteRestaurantId = null;
if (token) {
  const currentUser = await getCurrentUserByToken(token);
  userFavoriteRestaurantId = currentUser.favouriteRestaurant;
}
//console.log('userFavoriteRestaurantId', userFavoriteRestaurantId);

const renderUI = (restaurants) => {
  const restaurantsTable = document.querySelector('#restaurants tbody');

  // delete last row of table while there is more than one row
  while (restaurantsTable.rows.length > 1) {
    restaurantsTable.deleteRow(1);
  }

  // remove old "Not Available" p element
  const oldTableMessage = document.getElementById(notAvailableId);
  oldTableMessage ? oldTableMessage.remove() : false;

  // get restaurant with least distance and mark its row with special color
  const closestRestaurant = getClosestRestaurant(restaurants);
  //console.log('closestRestaurant', closestRestaurant);
  removeClassFromAllElements(closestRestaurantClass, 'tr');

  if (restaurants.length > 0) {
    // remove favorite column if not logged in
    if (!token) {
      const favoriteTableHeader = document.getElementById(
        'favorite-table-header'
      );

      if (favoriteTableHeader) {
        document
          .getElementById('table-headers')
          .removeChild(favoriteTableHeader);
      }
    }

    restaurants.forEach(async (restaurant) => {
      const row = restaurantRow(restaurant, token);

      // add event to table row
      row.addEventListener('click', () => {
        selectedRestaurant = restaurant;

        // if element does not have class, remove class from other elements and add to the element
        // if element has class, remove it
        if (!row.classList.contains(highlightClass)) {
          removeClassFromAllElements(highlightClass, 'tr');
          addClassToElement(row, highlightClass);

          // modal
          highlightModalMenuItem('daily-menu');
          renderModalContent(restaurant, 'daily-menu');
        } else {
          removeClassFromElement(row, highlightClass);
        }
      });
      restaurantsTable.appendChild(row);

      // determine if restaurant is closest, if so add id to row element
      if (restaurant.name === closestRestaurant.name) {
        addClassToElement(row, closestRestaurantClass);
      }

      // render radio buttons if user logged in
      if (token) {
        const radio = row.querySelector('input[type="radio"]');

        // make users favorite restaurant radio button selected
        if (restaurant._id === userFavoriteRestaurantId) {
          radio.checked = true;
        }

        // update users favorite restaurant in api
        radio.addEventListener('change', async (event) => {
          if (event.target.checked && token) {
            const userObject = {favouriteRestaurant: restaurant._id};
            await putUser(token, userObject);
          }
        });

        // prevent radio button click from opening restaurant modal
        radio.addEventListener('click', (event) => {
          event.stopPropagation();
        });
      }
    });
    showElement(restaurantsTable);
  } else {
    //
    hideElement(restaurantsTable);

    // display message in UI if no restaurants available
    const p = document.createElement('p');
    p.innerText = 'Data not available';
    p.id = notAvailableId;
    document.querySelector('main').appendChild(p);
  }
};

const filterRestaurants = (unfilteredRestaurants) => {
  // add filter to filter out restaurants which do not pass checkbox check
  const filtered = unfilteredRestaurants.filter((restaurant) => {
    // get restaurant specific company and city checkbox
    const companyCheckbox = document.getElementById(
      `show-${restaurant.company}`
    );
    const cityCheckbox = document.getElementById(`show-${restaurant.city}`);

    const companyOk = !companyCheckbox || companyCheckbox.checked;
    const cityOk = !cityCheckbox || cityCheckbox.checked;

    return companyOk && cityOk;
  });

  //console.log(filteredRestaurants);
  return filtered;
};

// render filter options (city, company) to UI
const renderFilterOptions = (restaurants) => {
  //console.log('render filter options', restaurants);

  const companies = [];
  const cities = [];

  restaurants.forEach((restaurant) => {
    const {company, city} = restaurant;

    if (!companies.includes(company)) {
      companies.push(company);
    }

    if (!cities.includes(city)) {
      cities.push(city);
    }
  });

  // sort aplhabetically
  companies.sort();
  cities.sort();

  //console.log('companies', companies);
  //console.log('cities', cities);

  // callback when any checkbox changes
  const onFilterChange = () => {
    filteredRestaurants = filterRestaurants(alphapheticalRestaurants);
    renderUI(filteredRestaurants);
    renderMapMarkers(filteredRestaurants, map, restaurantMarkers);
  };

  // render company filters
  const companyFilterElement = document.getElementById('company-filter');
  const companyFilterOl = document.createElement('ol');
  companyFilterElement.appendChild(companyFilterOl);
  getFilterOrderedList(companies, companyFilterOl, onFilterChange);

  // render city filters
  const cityFilterElement = document.getElementById('city-filter');
  const cityFilterOl = document.createElement('ol');
  cityFilterElement.appendChild(cityFilterOl);
  getFilterOrderedList(cities, cityFilterOl, onFilterChange);
};

// script starts

const restaurants = await getRestaurants();
console.log('restaurants', restaurants);

const restaurantsWithDistance = [];
const alphapheticalRestaurants = [];

// function called after location has been saved
const continueAfterLocation = () => {
  renderNav(token);

  restaurantsWithDistance.push(...addDistanceToRestaurants(restaurants));

  const sortedByName = [...restaurantsWithDistance].sort(
    (a, b) => a.name > b.name
  );
  alphapheticalRestaurants.push(...sortedByName);

  filteredRestaurants = [...alphapheticalRestaurants];

  renderUI(alphapheticalRestaurants);
  map = renderMap(selfCoordinates);
  renderMapMarkers(alphapheticalRestaurants, map, restaurantMarkers);

  renderFilterOptions(alphapheticalRestaurants);
};

getLocation();
initializeModalEventListeners(() => selectedRestaurant);

// filter element
document.getElementById('filter-options').addEventListener('click', (event) => {
  event.target.classList.toggle('active');

  const content = event.target.nextElementSibling;
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
});
