const getFilterOrderedList = (filterItems, ol, onFilterChange) => {
  filterItems.forEach((item, index) => {
    const li = document.createElement('li');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = `show-${item}`;
    input.name = `filter${index}`;
    input.checked = true;

    input.addEventListener('click', onFilterChange);

    const label = document.createElement('label');
    label.htmlFor = input.id;
    label.innerText = item;

    li.appendChild(input);
    li.appendChild(label);
    ol.appendChild(li);
  });
};

export {getFilterOrderedList};
