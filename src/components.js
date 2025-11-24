//
const restaurantRow = (restaurant) => {
  const {name, address, distance} = restaurant;

  const tdFavorite = document.createElement('td');
  const radio = document.createElement('input');
  radio.type = 'radio';
  radio.name = 'favoriteRestaurant';
  tdFavorite.appendChild(radio);

  const tdName = document.createElement('td');
  tdName.innerHTML = name;

  const tdAddress = document.createElement('td');
  tdAddress.innerHTML = address;

  const tdDistance = document.createElement('td');
  tdDistance.innerHTML = `~&nbsp;${distance.toFixed(1)}km`;

  const row = document.createElement('tr');
  row.appendChild(tdFavorite);
  row.appendChild(tdName);
  row.appendChild(tdAddress);
  row.appendChild(tdDistance);

  return row;
};

// render food cards in modal
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

    if (price?.length > 0) {
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

// render restaurant daily menu in modal
const restaurantDailyMenuModal = (menu) => {
  const {courses} = menu;

  if (courses.length > 0) {
    return formFoodCards(courses);
  }

  const p = document.createElement('p');
  p.innerText = 'Not available';

  const div = document.createElement('div');
  div.appendChild(p);
  return div;
};

// render restaurant weekly menu in modal
const restaurantWeeklyMenuModal = (menu) => {
  const {days} = menu;
  console.log(days);

  const div = document.createElement('div');

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

// render restaurant contact info in modal
const restaurantContactInfoModal = (restaurant) => {
  const {name, address, postalCode, city, phone, company} = restaurant;

  // table rows
  const info = [
    {label: 'Address', value: address},
    {label: 'City & Postal Code', value: `${postalCode}, ${city}`},
    {label: 'Phone', value: phone},
    {label: 'Company', value: company},
  ];

  const div = document.createElement('div');

  // restaurant name is used as modal header
  const header = document.createElement('h2');
  header.innerHTML = name;
  div.appendChild(header);

  info.forEach((infoItem) => {
    const p = document.createElement('p');
    p.innerText = infoItem.value ?? '';
    div.appendChild(p);
  });

  return div;
};

export {
  restaurantRow,
  restaurantDailyMenuModal,
  restaurantWeeklyMenuModal,
  restaurantContactInfoModal,
};
