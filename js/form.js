const advertForm = document.querySelector('.ad-form');
const advertFormElements = advertForm.children;
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormElements = mapFilterForm.children;
const priceSlider = document.querySelector('.ad-form__slider');

export const toInactiveForm = function () {
  advertForm.classList.add('ad-form--disabled');
  for (const element of advertFormElements) {
    element.disabled = true;
  }
  mapFilterForm.classList.add('map__filters--disabled');
  for (const element of mapFilterFormElements) {
    element.disabled = true;
  }
};


export const toActiveForm = function () {
  advertForm.classList.remove('ad-form--disabled');
  for (const element of advertFormElements) {
    element.disabled = false;
  }
  mapFilterForm.classList.remove('map__filters--disabled');
  for (const element of mapFilterFormElements) {
    element.disabled = false;
  }
};

const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

function validateTitleNotice(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(advertForm.querySelector('#title'), validateTitleNotice, 'Объявление от 30 до 100 символов');


const price = advertForm.querySelector('#price');
const typeOfHousing = document.querySelector('#type');
const typeOfHousingPrice = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};
const maxPrice = {
  palace: 100000,
  flat: 100000,
  house: 100000,
  bungalow: 100000,
  hotel: 100000
};

typeOfHousing.addEventListener('change', () => {
  price.placeholder = typeOfHousingPrice[typeOfHousing.value];
  price.min = typeOfHousingPrice[typeOfHousing.value];
  price.value = '';
});

function validatePrice(value) {
  return value <= maxPrice[typeOfHousing.value] && value >= typeOfHousingPrice[typeOfHousing.value];
}
function getPriceErrorReport() {
  return `не менее ${typeOfHousingPrice[typeOfHousing.value]} и не более ${maxPrice[typeOfHousing.value]}`;
}
pristine.addValidator(price, validatePrice, getPriceErrorReport);


const roomNumber = advertForm.querySelector('#room_number');
const capacityGuests = advertForm.querySelector('#capacity');
const possibleCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

function validateCapacity() {
  return possibleCapacity[roomNumber.value].includes(capacityGuests.value);
}

function getCapacityErrorReport() {
  if (roomNumber.value === '1') {
    return `${roomNumber.value} команта для 1 гостя`;
  }
  if (roomNumber.value === '2') {
    return `${roomNumber.value} команты для 1 или 2 гостей`;
  }
  if (roomNumber.value === '3') {
    return `${roomNumber.value} команты от 1 до 3 гостей`;
  }
  if (roomNumber.value === '100') {
    return `${roomNumber.value} комант не для гостей`;
  }
}

pristine.addValidator(roomNumber, validateCapacity);
pristine.addValidator(capacityGuests, validateCapacity, getCapacityErrorReport);



advertForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
