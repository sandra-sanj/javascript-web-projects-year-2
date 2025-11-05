import {restaurantRow, restaurantModal} from './components.js';
import {baseUrl, lang, highlightClass} from './variables.js';
import {fetchData} from './utils.js';

let filteredRestaurants = [];

// api requests
const getRestaurants = async () => {
  try {
    const api = '/api/v1/restaurants';
    const url = baseUrl + api;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetchData(url, options);
    console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    console.log('fetch data', data);

    return [...data]; // return restaurants (data) as list
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
};

const getDailyMenu = async (restaurant) => {
  try {
    console.log('id', restaurant._id);
    const api = `/api/v1/restaurants/daily/${restaurant._id}/${lang}`;
    const url = baseUrl + api;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, options);
    console.log('response', response);
    if (!response.ok) throw new Error('Invalid Input!');

    const data = await response.json();
    console.log('fetch data', data);
    return data;
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// map
const defaultCoordinates = {
  latitude: 60.22366,
  longitude: 25.07946,
};
let selfCoordinates;
//let sortedRestaurants;

// get location
const locationElement = document.getElementById('location');
const table = document.querySelector('table');
let map;
const restaurantMarkers = L.layerGroup();

const calculateDistanceTo = (lon1, lat1, lon2, lat2) => {
  return Math.sqrt((lat2 - lat1) ** 2 + (lon2 - lon1) ** 2) * 111;
};

/*const filterSortMapRestaurants = () => {
  // filter array from any entries without any location data
  const validRestaurants = restaurants.filter(
    (r) => r?.location?.coordinates?.length == 2
  );
  console.log('restaurants with valid location data', validRestaurants);

  // map array and add distance variable
  const mappedRestaurants = validRestaurants.map((restaurant) => {
    const [rLongitude, rLatitude] = restaurant.location.coordinates;
    console.log(selfCoordinates);
    const distance = calculateDistanceTo(
      selfCoordinates.longitude,
      selfCoordinates.latitude,
      rLongitude,
      rLatitude
    );
    return {...restaurant, distance: distance};
  });
  console.log('restaurants with distances', mappedRestaurants);

  // sort array by distance in ascending order
  sortedRestaurants = mappedRestaurants.sort(
    (r1, r2) => r1.distance - r2.distance
  );
  console.log('sorted restaurants', sortedRestaurants);
};*/

const renderMapMarkers = (restaurants) => {
  restaurantMarkers.clearLayers();

  restaurants.forEach((restaurant) => {
    const [rLongitude, rLatitude] = restaurant.location.coordinates;

    const marker = L.marker([rLatitude, rLongitude]).bindPopup(
      `<h3>${restaurant.name}</h3><p>${restaurant.address}</p>`
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
  locationElement.innerText = `Location: ${latitude.toFixed(
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
const removeClassFromAllElements = (className) => {
  const elements = document.querySelectorAll('tr');
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

// modal
const modal = document.getElementById('modal');

// render elements in ui
const renderModalContent = async (restaurant) => {
  console.log('rendering restaurant in modal', restaurant);

  const dailyMenu = await getDailyMenu(restaurant);
  console.log('dailyMenu', dailyMenu);

  modal.innerHTML = ''; // empty modal contents
  modal.appendChild(restaurantModal(restaurant, dailyMenu));
  modal.showModal(); // open modal
};

const sodexoCheckbox = document.getElementById('show-sodexo');
const compassCheckbox = document.getElementById('show-compass');

const renderUI = (restaurants) => {
  const restaurantsTable = document.querySelector('#restaurants tbody');
  restaurantsTable.innerHTML = ''; // empty table

  const headerName = document.createElement('th');
  headerName.innerText = 'Name';
  const headerAddress = document.createElement('th');
  headerAddress.innerText = 'Address';

  const headerRow = document.createElement('tr');
  headerRow.appendChild(headerName);
  headerRow.appendChild(headerAddress);

  restaurantsTable.appendChild(headerRow);

  if (restaurants.length > 0) {
    restaurants.forEach((restaurant) => {
      const row = restaurantRow(restaurant);
      row.addEventListener('click', () => {
        // if element does not have class, remove class from other elements and add to the element
        // if element has class, remove it
        if (!row.classList.contains(highlightClass)) {
          removeClassFromAllElements(highlightClass);
          addClassToElement(row, highlightClass);
          renderModalContent(restaurant);
        } else {
          removeClassFromElement(row, highlightClass);
        }
      });
      restaurantsTable.appendChild(row);
    });
  } else {
    // display message in UI if no restaurants available
    const p = document.createElement('p');
    p.innerText = 'Data not available';

    restaurantsTable.innerHTML = ''; // empty table
    restaurantsTable.appendChild(p);
  }
};

const filterRestaurants = (unfilteredRestaurants) => {
  // add filter to filter out restaurants
  function checkRestaurantCompany(restaurant) {
    //console.log(sodexoCheckbox.checked, compassCheckbox.checked, restaurant.company);

    if (restaurant.company == 'Sodexo' && sodexoCheckbox.checked) {
      return true;
    } else if (
      restaurant.company == 'Compass Group' &&
      compassCheckbox.checked
    ) {
      return true;
    }

    return false;
  }

  filteredRestaurants =
    unfilteredRestaurants.length > 0 ? unfilteredRestaurants.filter(checkRestaurantCompany) : [];
  console.log(filteredRestaurants);
};

// script starts

const restaurants = await getRestaurants();
console.log('restaurants', restaurants);

// order list in alphaphetical order
const alphapheticalRestaurants = restaurants.sort((a, b) => a.name > b.name);

// function called after location has been saved
const continueAfterLocation = () => {
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
    removeClassFromAllElements(highlightClass);
  }
});

sodexoCheckbox.addEventListener('click', (event) => {
  filterRestaurants(alphapheticalRestaurants);
  renderUI(filteredRestaurants);
  renderMapMarkers(filteredRestaurants);
});

compassCheckbox.addEventListener('click', (event) => {
  filterRestaurants(alphapheticalRestaurants);
  renderUI(filteredRestaurants);
  renderMapMarkers(filteredRestaurants);
});
