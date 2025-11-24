import {
  restaurantDailyMenuModal,
  restaurantWeeklyMenuModal,
  restaurantContactInfoModal,
} from './restaurant.js';
import {
  highlightClass,
  highlightModalMenuClass,
  removeClassFromAllElements,
} from '../utils/variables.js';
import {getDailyMenu, getWeeklyMenu} from '../api/api.js';

// render modal content
const renderModalContent = async (restaurant, menuType) => {
  const modal = document.getElementById('modal');

  // remove all elements (not "ol") from modal
  const modalChildren = modal.children;
  for (let element of modalChildren) {
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

// helper function to remove highlight from all modal menu items
const removeModalMenuHighlight = () => {
  const modalMenuItems = document.querySelectorAll('#modal ol li');
  modalMenuItems.forEach((item) =>
    item.classList.remove(highlightModalMenuClass)
  );
};

// helper function to highlight a modal menu item
const highlightModalMenuItem = (menuItemId) => {
  removeModalMenuHighlight();
  const menuItem = document.getElementById(menuItemId);
  if (menuItem) {
    menuItem.classList.add(highlightModalMenuClass);
  }
};

// initialize modal event listeners
const initializeModalEventListeners = (getSelectedRestaurant) => {
  const modal = document.getElementById('modal');

  if (!modal) {
    console.error('Modal not found');
    return;
  }

  // close modal when clicking outside
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
      removeModalMenuHighlight();
      removeClassFromAllElements(highlightClass, 'tr');
    }
  });

  const dailyMenuTab = document.getElementById('daily-menu');
  if (dailyMenuTab) {
    dailyMenuTab.addEventListener('click', async (event) => {
      highlightModalMenuItem('daily-menu');

      const restaurant = await getSelectedRestaurant();
      if (restaurant) {
        await renderModalContent(restaurant, 'daily-menu');
      }
    });
  }

  const weeklyMenuTab = document.getElementById('weekly-menu');
  if (weeklyMenuTab) {
    weeklyMenuTab.addEventListener('click', async (event) => {
      highlightModalMenuItem('weekly-menu');

      const restaurant = await getSelectedRestaurant();
      if (restaurant) {
        await renderModalContent(restaurant, 'weekly-menu');
      }
    });
  }

  const contactInfoTab = document.getElementById('contact-info');
  if (contactInfoTab) {
    contactInfoTab.addEventListener('click', async (event) => {
      highlightModalMenuItem('contact-info');

      const restaurant = await getSelectedRestaurant();
      if (restaurant) {
        await renderModalContent(restaurant, 'contact-info');
      }
    });
  }

  // close modal button
  const closeModalBtn = document.getElementById('close-modal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.close();
      removeModalMenuHighlight();
      removeClassFromAllElements(highlightClass, 'tr');
    });
  }
};

export {
  renderModalContent,
  removeModalMenuHighlight,
  highlightModalMenuItem,
  initializeModalEventListeners,
};
