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

const insertRestaurantInfoDataToModal = (restaurant) => {
  const {name, address, postalCode, city, phone, company} = restaurant;

  // table rows
  const info = [
    {label: 'Address', value: address},
    {label: 'City & Postal Code', value: `${city}, ${postalCode}`},
    {label: 'Phone', value: phone},
    {label: 'Company', value: company},
  ];

  // restaurant name is used as modal header
  const header = document.createElement('h2');
  header.innerHTML = name;

  const table = document.createElement('table');

  // insert info items to table as rows
  info.forEach((infoItem) => {
    const row = table.insertRow();

    const rowKey = row.insertCell();
    rowKey.innerText = infoItem.label;

    const rowValue = row.insertCell();
    rowValue.innerText = infoItem.value ?? '-';
  });

  const div = document.createElement('div');
  div.appendChild(header);
  div.appendChild(table);
  console.log(div);
  return div;
};

const insertRestaurantDailyMenuToModal = (menu) => {
  const {courses} = menu;

  const header = document.createElement('h3');
  header.innerHTML = 'Daily Menu';

  const div = document.createElement('div');
  div.appendChild(header);

  if (courses.length > 0) {
    const table = document.createElement('table');
    div.appendChild(table);

    const headerRow = table.insertRow();
    headerRow.insertCell().innerText = 'Course';
    headerRow.insertCell().innerText = 'Price';
    headerRow.insertCell().innerText = 'Diets';

    // insert rows and cells to table containing name, price, diets
    courses.forEach((course) => {
      const {name, price, diets} = course;

      const row = table.insertRow();
      row.insertCell().innerText = name.length > 0 ? name : '-';
      row.insertCell().innerText = price.length > 0 ? price : '-';

      let dietText;
      if (Array.isArray(diets)) {
        dietText = diets.length > 0 ? diets.join(', ') : '-';
      } else {
        dietText = diets && diets.length > 0 ? diets : '-';
      }
      row.insertCell().innerText = dietText;
    });
  } else {
    const p = document.createElement('p');
    p.innerText = 'Not available';
    div.appendChild(p);
  }
  return div;
};

const restaurantModal = (restaurant, menu) => {
  const infoContent = insertRestaurantInfoDataToModal(restaurant);
  const menuContent = insertRestaurantDailyMenuToModal(menu);

  const modalDiv = document.createElement('div');
  modalDiv.appendChild(infoContent);
  modalDiv.appendChild(menuContent);

  return modalDiv;
};

export {restaurantRow, restaurantModal};
