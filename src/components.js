const restaurantRow = (restaurant) => {
  const {name, address} = restaurant;

  const tdName = document.createElement('td');
  tdName.innerHTML = name;

  const tdAddress = document.createElement('td');
  tdAddress.innerHTML = address;

  const row = document.createElement('tr');
  row.appendChild(tdName);
  row.appendChild(tdAddress);

  return row;
};

const formFoodCards = (courses) => {
  const div = document.createElement('div');

  courses.forEach((course) => {
    const foodCard = document.createElement('div');
    div.appendChild(foodCard);
    foodCard.classList.add('food-card');

    const {name, price, diets} = course;

    //const row = table.insertRow();
    const foodAndDietsContainer = document.createElement('div');

    const nameItem = document.createElement('p');
    nameItem.innerText = name.length > 0 ? name : '-';

    const dietsItem = document.createElement('p');
    let dietText;
    if (Array.isArray(diets)) {
      dietText = diets.length > 0 ? diets.join(', ') : '-';
    } else {
      dietText = diets && diets.length > 0 ? diets : '-';
    }
    dietsItem.innerText = dietText;

    const priceContainer = document.createElement('div');

    if (price.length > 0) {
      price.split('/').map((item) => {
        const p = document.createElement('p');
        p.innerText = item.trim();
        priceContainer.appendChild(p);
      });
    } else {
      const p = document.createElement('p');
      p.innerText = '-';
      priceContainer.appendChild(p);
    }

    foodAndDietsContainer.appendChild(nameItem);
    foodAndDietsContainer.appendChild(dietsItem);

    foodCard.appendChild(foodAndDietsContainer);
    foodCard.appendChild(priceContainer);
  });

  return div;
};

const insertRestaurantDailyMenuToModal = (menu) => {
  const {courses} = menu;

  if (courses.length > 0) {
    const div = document.createElement('div');
    div.appendChild(formFoodCards(courses));
    return div;
  } else {
    const p = document.createElement('p');
    p.innerText = 'Not available';
    return p;
  }
};

const insertRestaurantWeeklyMenuToModal = (menu) => {
  const {days} = menu;
  console.log(days);

  const div = document.createElement('div');

  // create buttons for weekdays
  const ol = document.createElement('ol');
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  weekdays.forEach((day) => {
    const li = document.createElement('li');
    li.innerText = day;
    ol.appendChild(li);
  });
  div.appendChild(ol);

  // create daily menu cards
  if (days.length > 0) {
    days.forEach((day) => {
      console.log(day);

      const p = document.createElement('p');
      p.innerHTML = day.date;
      div.appendChild(p);

      div.appendChild(formFoodCards(day.courses));
    });
  } else {
    const p = document.createElement('p');
    p.innerText = 'Not available';
    div.appendChild(p);
  }
  return div;
};

const restaurantModal = (modalContent) => {
  const modalDiv = document.createElement('div');
  modalDiv.appendChild(modalContent);
  return modalDiv;
};

const restaurantDailyMenuModal = (menu) => {
  const menuContent = insertRestaurantDailyMenuToModal(menu);
  return restaurantModal(menuContent);
};

const restaurantWeeklyMenuModal = (menu) => {
  const menuContent = insertRestaurantWeeklyMenuToModal(menu);
  return restaurantModal(menuContent);
};

export {
  restaurantRow,
  restaurantModal,
  restaurantDailyMenuModal,
  restaurantWeeklyMenuModal,
};
