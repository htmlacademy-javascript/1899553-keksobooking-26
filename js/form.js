const advertForm = document.querySelector('.ad-form');
const advertFormElements = advertForm.children;
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormElements = mapFilterForm.children;

const toInactiveForm = function () {
  advertForm.classList.add('ad-form--disabled');
  for (const element of advertFormElements) {
    element.disabled = true;
  }
  mapFilterForm.classList.add('map__filters--disabled');
  for (const element of mapFilterFormElements) {
    element.disabled = true;
  }
};
toInactiveForm();

const toActiveForm = function () {
  advertForm.classList.remove('ad-form--disabled');
  for (const element of advertFormElements) {
    element.disabled = false;
  }
  mapFilterForm.classList.remove('map__filters--disabled');
  for (const element of mapFilterFormElements) {
    element.disabled = false;
  }
};
