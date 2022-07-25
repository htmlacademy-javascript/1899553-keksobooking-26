// import { toActiveForm } from './form.js';
// import { createObjects } from './data.js';
import { drawObjects } from './generator_card.js';
const resetButton = document.querySelector('.ad-form__reset');
const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const priceSlider = document.querySelector('.ad-form__slider');
const previewPhoto = document.querySelector('.ad-form__photo');
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const advertForm = document.querySelector('.ad-form');
const mapFilterForm = document.querySelector('.map__filters');
const tokioLatDefault = 35.6895;
const tokioLngDefault = 139.692;
// const arrayOfObjects = createObjects();
const scaleGlobal = 10;
const scaleLocal = 18;

export const map = L.map('map-canvas')
  .on('load', () => {
    toActiveForm();
  })
  .setView({
    lat: tokioLatDefault,
    lng: tokioLngDefault,
  }, scaleGlobal);

const tiles = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);


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
    lat: tokioLatDefault,
    lng: tokioLngDefault,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

tiles.addTo(map);
mainMarker.addTo(map);
mainMarker.on('moveend', (evt) => {
  const afterPoint = 4;
  const lat = evt.target.getLatLng().lat.toFixed(afterPoint);
  const lng = evt.target.getLatLng().lng.toFixed(afterPoint);
  document.querySelector('#address').value = `LatLng(${lat}, ${lng})`;
});

export const clearMarkers = () => {
  markerGroup.clearLayers();
};

resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: tokioLatDefault,
    lng: tokioLngDefault,
  });
  map.setView({
    lat: tokioLatDefault,
    lng: tokioLngDefault,
  }, scaleLocal);
  map.closePopup();
  noticeForm.reset();
  mapFilterForm.reset();
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhoto.innerHTML = '';
  priceSlider.noUiSlider.reset();
  clearMarkers();
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

export const renderCards = (elements) => {
  elements.forEach((element) => {
    createMarker(element);
  });
};

