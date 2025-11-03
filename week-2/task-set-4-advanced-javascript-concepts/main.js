import {restaurantRow, restaurantModal} from './components.js';
import {baseUrl, lang, highlightClass} from './variables.js';
import {fetchData} from './utils.js';

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

const modal = document.getElementById('modal');

// close modal when mouse clicked outside of it
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
    removeClassFromAllElements(highlightClass);
  }
});

const renderModalContent = async (restaurant) => {
  console.log('rendering restaurant in modal', restaurant);

  const dailyMenu = await getDailyMenu(restaurant);
  console.log('dailyMenu', dailyMenu);

  modal.innerHTML = ''; // empty modal contents
  modal.appendChild(restaurantModal(restaurant, dailyMenu));
  modal.showModal(); // open modal
};

const renderUI = (array) => {
  const restaurantsTable = document.querySelector('#restaurants tbody');

  if (array.length > 0) {
    array.forEach((restaurant) => {
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

    restaurantsTable.innerHTML = '';
    restaurantsTable.appendChild(p);
  }
};

// script starts

const restaurants = await getRestaurants();
console.log('restaurants', restaurants);

// order list in alphaphetical order
const alphapheticalRestaurants = restaurants.sort((a, b) => a.name > b.name);

renderUI(alphapheticalRestaurants);
