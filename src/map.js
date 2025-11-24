import {
  highlightModalMenuItem,
  renderModalContent,
} from './restaurant-modal.js';

const renderMapMarkers = (restaurants, map, markers) => {
  markers.clearLayers();

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
      <button class="btn marker-btn">View</button>
      `
    );

    // add event to marker button
    marker.on('popupopen', () => {
      const button = document.querySelector('.marker-btn');
      if (button) {
        button.addEventListener('click', () => {
          console.log('View button clicked for', restaurant.name);

          // modal
          highlightModalMenuItem('daily-menu');
          renderModalContent(restaurant, 'daily-menu');
        });
      }
    });

    markers.addLayer(marker);

    console.log('marker', marker);
  });

  markers.addTo(map);
};

const renderMap = (selfCoordinates) => {
  const map = L.map('map').setView(
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

  return map;
};

export {renderMapMarkers, renderMap};
