import { drawObjects } from './generator_card.js';
import { getData } from './api.js';
const resetButton = document.querySelector('.ad-form__reset');
const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const priceSlider = document.querySelector('.ad-form__slider');
const previewPhoto = document.querySelector('.ad-form__photo');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const advertForm = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const price = advertForm.querySelector('#price');
const typeOfHousing = document.querySelector('#type');
const LAT_DEFAULT = 35.68951;
const LNG_DEFAULT = 139.69201;
const SCALE_GLOBAL = 10;
const SCALE_LOCAL = 18;
const VALUE_OF_OBJECT = 10;
const map = L.map('map-canvas');
const typeOfHousingPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

const loadMap = (form) => {
  map
    .on('load', () => {
      form(true);
    })
    .setView({
      lat: LAT_DEFAULT,
      lng: LNG_DEFAULT,
    }, SCALE_GLOBAL);
};

const tiles = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);


//стилизация маркеров
const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const mainMarker = L.marker(
  {
    lat: LAT_DEFAULT,
    lng: LNG_DEFAULT,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

tiles.addTo(map);
mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const afterPoint = 5;
  const lat = evt.target.getLatLng().lat.toFixed(afterPoint);
  const lng = evt.target.getLatLng().lng.toFixed(afterPoint);
  document.querySelector('#address').value = `${lat}, ${lng}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (element) => {
  const marker = L.marker({
    lat: element.location.lat,
    lng: element.location.lng
  },
    {
      icon: pinIcon,
    });

  marker
    .addTo(markerGroup)
    .bindPopup(drawObjects(element));
};

const renderCards = (elements) => {
  elements.forEach((element) => {
    createMarker(element);
  });
};

const clearMarkers = () => {
  markerGroup.clearLayers();
};

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: LAT_DEFAULT,
    lng: LNG_DEFAULT,
  });
  map.setView({
    lat: LAT_DEFAULT,
    lng: LNG_DEFAULT,
  }, SCALE_LOCAL);
  map.closePopup();
  advertForm.reset();
  mapFilterForm.reset();
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhoto.innerHTML = '';
  price.placeholder = typeOfHousingPrice[typeOfHousing.value];
  priceSlider.noUiSlider.reset();
  clearMarkers();
  getData((data) => {
    renderCards(data.slice(0, VALUE_OF_OBJECT));
  });
});

export { renderCards, clearMarkers, loadMap };
