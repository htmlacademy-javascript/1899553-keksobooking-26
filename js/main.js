import './generator_card.js';
import { toActiveForm, getSuccessReport, setUserFormSubmit } from './form.js';
import { renderCards, clearMarkers, loadMap } from './map.js';
import { debounce } from './util.js';
import { loadMedia } from './avatar.js';
import { toFilteredMap } from './filter.js';
import { getData } from './api.js';


const RERENDER_DELAY = 500;
const VALUE_OF_OBJECT = 10;
const mapFilters = document.querySelector('.map__filters');
toActiveForm(false);
loadMap(toActiveForm);

getData((data) => {
  renderCards(data.slice(0, VALUE_OF_OBJECT));
  mapFilters.addEventListener('change', debounce(() => {
    clearMarkers();
    renderCards(data.slice().filter(toFilteredMap).slice(0, VALUE_OF_OBJECT));
  }, RERENDER_DELAY));
});

setUserFormSubmit(getSuccessReport);
loadMedia();
