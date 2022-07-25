import { drawObjects } from './generator_card.js';
// import { createObjects } from './data.js';
import { setUserFormSubmit, getSuccessMessage, toActiveForm } from './form.js';
import { renderCards, clearMarkers, map } from './map.js';
import { debounce } from './util.js';
import { loadFileAvatar, loadFilePhoto } from './avatar.js';
import { toFilteredMap } from './filter.js';
import { getData } from './api.js';


const mapFilters = document.querySelector('.map__filters');
const RERENDER_DELAY = 500;
const VALUE_OF_OBJECT = 10;
toActivateForm(false);
loadMap(toActivateForm);

getData((data) => {
  renderCards(data.slice(0, VALUE_OF_OBJECT));
  mapFilters.addEventListener('change', debounce(() => {
    clearMarkers();
    renderCards(data.slice().filter(toFilteredMap).slice(0, VALUE_OF_OBJECT));
  }, RERENDER_DELAY));
});

setUserFormSubmit(getSuccessMessage);
loadFileAvatar();
loadFilePhoto();
drawObjects(createObjects());
