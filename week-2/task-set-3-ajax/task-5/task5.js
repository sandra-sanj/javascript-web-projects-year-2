const lang = 'en';

const highlightClass = 'highlight';

async function getRestaurants() {
  try {
    const api = '/api/v1/restaurants';
    const url = `https://media2.edu.metropolia.fi/restaurant/${api}`;

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

    return [...data]; // return restaurants (data) as list
  } catch (error) {
    console.error('An error occurred:', error);
    return [];
  }
}

async function getDailyMenu(restaurant) {
  try {
    console.log('id', restaurant._id);
    const api = `/api/v1/restaurants/daily/${restaurant._id}/${lang}`;
    const url = `https://media2.edu.metropolia.fi/restaurant/${api}`;

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
}

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

const insertRestaurantInfoDataToModal = (restaurant) => {
  const infoTable = document.getElementById('restaurant-info');
  infoTable.innerHTML = '';

  // display restaurant basic info in modal
  const info = [
    //{key: 'name', label: 'Name'},
    {key: 'address', label: 'Address'},
    {key: 'postalCode', label: 'Postal Code'},
    {key: 'city', label: 'City'},
    {key: 'phone', label: 'Phone'},
    {key: 'company', label: 'Company'},
  ];

  document.getElementById('restaurant-name').innerText = restaurant.name;

  info.forEach((item) => {
    const row = infoTable.insertRow();

    const rowKey = row.insertCell();
    rowKey.innerText = item.label;

    const rowValue = row.insertCell();
    rowValue.innerText = restaurant[item.key];
  });
};

const insertRestaurantDailyMenuToModal = async (restaurant) => {
  const menuTable = document.getElementById('restaurant-daily-menu');
  menuTable.innerHTML = '';

  const dailyMenu = await getDailyMenu(restaurant);
  console.log('dailyMenu', dailyMenu);

  if (dailyMenu.courses.length > 0) {
    // name, price, diets
    dailyMenu.courses.forEach((item) => {
      // insert rows and cells to table
      const row = menuTable.insertRow();
      row.insertCell().innerText = item.name;
      row.insertCell().innerText = item.price;
      row.insertCell().innerText = item.diets;
    });
  } else {
    const p = document.createElement('p');
    p.innerText = 'Not available';
    menuTable.appendChild(p);
  }
};

const renderModalContent = (restaurant) => {
  console.log('rendering restaurant in modal', restaurant);

  insertRestaurantInfoDataToModal(restaurant);
  insertRestaurantDailyMenuToModal(restaurant);
};

const openRestaurantInfoModal = (restaurant) => {
  const modal = document.getElementById('modal');
  renderModalContent(restaurant);
  modal.showModal(); // open modal

  // close modal when mouse clicked outside of it
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
      removeClassFromAllElements(highlightClass);
    }
  });
};

const renderUI = (array) => {
  const restaurantsTable = document.getElementById('restaurants');

  if (array.length > 0) {
    array.forEach((item) => {
      const tdName = document.createElement('td');
      tdName.innerHTML = item.name;

      const tdAddress = document.createElement('td');
      tdAddress.innerHTML = item.address;

      const tr = document.createElement('tr');
      tr.appendChild(tdName);
      tr.appendChild(tdAddress);

      tr.addEventListener('click', () => {
        // if element does not have class, remove clas from other elements and add to the element
        // if element has class, remove it
        if (!tr.classList.contains(highlightClass)) {
          removeClassFromAllElements(highlightClass);
          addClassToElement(tr, highlightClass);
          openRestaurantInfoModal(item);
        } else {
          removeClassFromElement(tr, highlightClass);
        }
      });

      restaurantsTable.appendChild(tr);
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
