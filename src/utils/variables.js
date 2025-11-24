const baseUrl = 'https://media2.edu.metropolia.fi/restaurant';

// which language restaurant data is fetched from API
const lang = 'en';

const defaultCoordinates = {
  latitude: 60.22366,
  longitude: 25.07946,
};

const highlightClass = 'highlight';
const closestRestaurantClass = 'closest';
const highlightModalMenuClass = 'hightlight-modal-menu';
const notAvailableId = 'not-available';

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

export {
  baseUrl,
  lang,
  defaultCoordinates,
  highlightClass,
  closestRestaurantClass,
  highlightModalMenuClass,
  notAvailableId,
  removeClassFromAllElements,
  addClassToElement,
  removeClassFromElement,
  hideElement,
  showElement,
};
