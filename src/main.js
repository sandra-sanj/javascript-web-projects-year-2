import {
  restaurantRow,
  restaurantDailyMenuModal,
  restaurantWeeklyMenuModal,
  restaurantContactInfoModal,
} from './components.js';
import {
  highlightClass,
  closestRestaurantClass,
  highlightModalMenuClass,
  notAvailableId,
  defaultCoordinates,
} from './variables.js';
import {getRestaurants, getDailyMenu, getWeeklyMenu} from './api.js';

let filteredRestaurants = [];
let selectedRestaurant;

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
  console.log('restaurants with distances', mappedRestaurants);

  return mappedRestaurants;
};

const renderMapMarkers = (restaurants) => {
  restaurantMarkers.clearLayers();

  restaurants.forEach((restaurant) => {
    const {
      name,
      address,
      postalCode,
      city,
      phone,
      company,
      location,
      distance,
    } = restaurant;

    const [rLongitude, rLatitude] = location.coordinates;

    const marker = L.marker([rLatitude, rLongitude]).bindPopup(
      `<h3>${name}</h3>
      <p>${address}</p>
      <p>${postalCode}, ${city}</p>
      <p>${phone}</p>
      <p>${company}</p>
      <p>~&nbsp;${distance.toFixed(1)}km</p>
      `
    );
    restaurantMarkers.addLayer(marker);
  });

  restaurantMarkers.addTo(map);
};

const renderMap = () => {
  map = L.map('map').setView(
    [selfCoordinates.latitude, selfCoordinates.longitude],
    13
  );

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const userIcon = L.icon({
    iconUrl:
      'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
  });

  L.marker([selfCoordinates.latitude, selfCoordinates.longitude], {
    icon: userIcon,
  }).addTo(map);
};

const locationSuccess = (position) => {
  selfCoordinates = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  console.log(selfCoordinates);

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

// class
const removeClassFromAllElements = (className, elementType) => {
  const elements = document.querySelectorAll(elementType);
  elements.forEach((element) => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });
};

const addClassToElement = (element, className) => {
  element.classList.add(className);
};

const removeClassFromElement = (element, className) => {
  element.classList.remove(className);
};

const hideElement = (element) => {
  element.style.display = 'none';
};

const showElement = (element) => {
  element.style.display = '';
};

// modal
const modal = document.getElementById('modal');

// render elements in ui
const renderModalContent = async (restaurant, menuType) => {
  // remove all elements (not "ol") from modal
  for (let element of modal.children) {
    if (element.tagName.toLowerCase() !== 'ol') {
      modal.removeChild(element);
    }
  }

  let modalContent;

  // get menu or info based on menuType
  if (!menuType || menuType === 'daily-menu') {
    const dailyMenu = await getDailyMenu(restaurant);
    modalContent = restaurantDailyMenuModal(dailyMenu);
  } else if (menuType === 'weekly-menu') {
    const weeklyMenu = await getWeeklyMenu(restaurant);
    modalContent = restaurantWeeklyMenuModal(weeklyMenu);
  } else if (menuType === 'contact-info') {
    modalContent = restaurantContactInfoModal(restaurant);
  }

  modal.appendChild(modalContent);
  modal.showModal(); // open modal
};

const sodexoCheckbox = document.getElementById('show-sodexo');
const compassCheckbox = document.getElementById('show-compass');

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
    restaurants.forEach((restaurant) => {
      const row = restaurantRow(restaurant);

      // add event to table row
      row.addEventListener('click', () => {
        selectedRestaurant = restaurant;

        // if element does not have class, remove class from other elements and add to the element
        // if element has class, remove it
        if (!row.classList.contains(highlightClass)) {
          removeClassFromAllElements(highlightClass, 'tr');
          addClassToElement(row, highlightClass);

          // modal
          addClassToElement(
            document.getElementById('daily-menu'),
            highlightModalMenuClass
          );
          renderModalContent(restaurant, false);
        } else {
          removeClassFromElement(row, highlightClass);
        }
      });
      restaurantsTable.appendChild(row);

      // determine if restaurant is closest, if so add id to row element
      if (restaurant.name === closestRestaurant.name) {
        addClassToElement(row, closestRestaurantClass);
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
    document.querySelector('body').appendChild(p);
  }
};

const filterRestaurants = (unfilteredRestaurants) => {
  // add filter to filter out restaurants
  function checkRestaurantCompany(restaurant) {
    if (restaurant.company == 'Sodexo' && sodexoCheckbox?.checked) {
      return true;
    } else if (
      restaurant.company == 'Compass Group' &&
      compassCheckbox?.checked
    ) {
      return true;
    }
    return false;
  }

  filteredRestaurants =
    unfilteredRestaurants.length > 0
      ? unfilteredRestaurants.filter(checkRestaurantCompany)
      : [];
  console.log(filteredRestaurants);
};

// script starts

const restaurants = await getRestaurants();
console.log('restaurants', restaurants);

const restaurantsWithDistance = [];
const alphapheticalRestaurants = [];

// function called after location has been saved
const continueAfterLocation = () => {
  restaurantsWithDistance.push(...addDistanceToRestaurants(restaurants));

  const sortedByName = [...restaurantsWithDistance].sort(
    (a, b) => a.name > b.name
  );
  alphapheticalRestaurants.push(...sortedByName);

  renderUI(alphapheticalRestaurants);
  renderMap();
  renderMapMarkers(alphapheticalRestaurants);
};

getLocation();

// events

// close modal when mouse clicked outside of it
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
    removeClassFromAllElements(highlightClass, 'tr');
    removeClassFromAllElements(highlightModalMenuClass, 'li');
  }
});

// filtering events
sodexoCheckbox?.addEventListener('click', () => {
  filterRestaurants(alphapheticalRestaurants);
  renderUI(filteredRestaurants);
  renderMapMarkers(filteredRestaurants);
});

compassCheckbox?.addEventListener('click', () => {
  filterRestaurants(alphapheticalRestaurants);
  renderUI(filteredRestaurants);
  renderMapMarkers(filteredRestaurants);
});

// modal menu events
document.getElementById('daily-menu').addEventListener('click', (event) => {
  removeClassFromAllElements(highlightModalMenuClass, 'li');
  addClassToElement(event.target, highlightModalMenuClass);

  renderModalContent(selectedRestaurant, event.target.id);
});

document.getElementById('weekly-menu').addEventListener('click', (event) => {
  removeClassFromAllElements(highlightModalMenuClass, 'li');
  addClassToElement(event.target, highlightModalMenuClass);

  renderModalContent(selectedRestaurant, event.target.id);
});

document.getElementById('contact-info').addEventListener('click', (event) => {
  removeClassFromAllElements(highlightModalMenuClass, 'li');
  addClassToElement(event.target, highlightModalMenuClass);

  renderModalContent(selectedRestaurant, event.target.id);
});

document.getElementById('close-modal').addEventListener('click', () => {
  modal.close();
  removeClassFromAllElements(highlightModalMenuClass, 'li');
  removeClassFromAllElements(highlightClass, 'tr');
});

// render filter options (city, company, distance) to UI
const renderFilterOptions = () => {};

// filter
document.getElementById('filter-options').addEventListener('click', (event) => {
  event.target.classList.toggle('active');

  const content = event.target.nextElementSibling;
  if (content.style.display === 'block') {
    content.style.display = 'none';
  } else {
    content.style.display = 'block';
  }
  //renderFilterOptions();
});

document.getElementById('active-filters').addEventListener('click', (event) => {
  event.target.classList.toggle('active');

  const content = event.target.nextElementSibling;
  if (content.style.display === 'flex') {
    content.style.display = 'none';
  } else {
    content.style.display = 'flex';
  }
});
