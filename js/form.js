import {sendData} from './api.js'
import {clearMarkers} from './map.js';

const advertForm = document.querySelector('.ad-form');
const advertFormElements = advertForm.children;
const mapFilterForm = document.querySelector('.map__filters');
const mapFilterFormElements = mapFilterForm.children;

const AVATAR_DEFAULT = 'img/muffin-grey.svg';
const previewAvatar = document.querySelector('.ad-form-header__avatar');
const previewPhoto = document.querySelector('.ad-form__photo');

const price = advertForm.querySelector('#price');
const typeOfHousing = document.querySelector('#type');
const priceSlider = document.querySelector('.ad-form__slider');
const onButtonSubmit = advertForm.querySelector('.ad-form__submit');
const success = document.querySelector('#success')
  .content.querySelector('.success');
const error = document.querySelector('#error')
  .content.querySelector('.error');
const buttonError = error.querySelector('.error__button');
const body = document.querySelector('body');

// функция влючения формы

export const toActiveForm = (isActiveForm) => {
  if (isActiveForm) {
    advertForm.classList.remove('ad-form--disabled');
    for (const element of advertFormElements) {
      element.disabled = false;
    }
    mapFilterForm.classList.remove('map__filters--disabled');
    for (const element of mapFilterFormElements) {
      element.disabled = false;
    }
  } else {
    advertForm.classList.add('ad-form--disabled');
    for (const element of advertFormElements) {
      element.disabled = true;
    }
    mapFilterForm.classList.add('map__filters--disabled');
    for (const element of mapFilterFormElements) {
      element.disabled = true;
    }
  }
};
const pristine = new Pristine(advertForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error-text',
});

//проверка валидности "Заголовок объявления"
function validateTitleNotice(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(advertForm.querySelector('#title'), validateTitleNotice, 'Объявление от 30 до 100 символов');


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

//проверка валидности "Тип жилья and Цена за ночь, руб."
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

//проверка валидности "Количество комнат и количество мест"
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

const timeIn = advertForm.querySelector('#timein');
const timeOut = advertForm.querySelector('#timeout');

// Время заезда/выезда
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
  pristine.validate();
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
  pristine.validate();
});

function validateTime() {
  return timeIn.value === timeOut.value;
}

pristine.addValidator(timeOut, validateTime);

//слайдер
noUiSlider.create(priceSlider, {
  range: {
    min:Number(price.min),
    max:Number(price.max),
  },
  start:Number(price.placeholder),
  step:10,
  connect:'upper',
});
priceSlider.noUiSlider.on('slide', () => {
  price.value = Number(priceSlider.noUiSlider.get());
  pristine.validate();
});
price.addEventListener('change', (evt) => {
  priceSlider.noUiSlider.set(Number(evt.target.value));
});

//функция об успешной отправке
export const getSuccessReport = () => {
  const successReport = success.cloneNode(true);
  body.appendChild(successReport);
  document.addEventListener('click', () => {
    successReport.remove();
  });
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      successReport.remove();
    }
  });
  advertForm.reset();
  mapFilterForm.reset();
  previewAvatar.src = AVATAR_DEFAULT;
  previewPhoto.innerHTML = '';
  onButtonSubmit.disabled = false;
  priceSlider.noUiSlider.reset();
  clearMarkers();
};
//функция об НЕуспешной отправке
const getErrorReport = () => {
  const errorReport = error.cloneNode(true);
  body.appendChild(errorReport);
  document.addEventListener('click', () => {
    errorReport.remove();
  });
  document.addEventListener('keydown',(evt) => {
    if (evt.key === 'Escape') {
      errorReport.remove();
    }
  });
  buttonError.querySelector('click', () => {
    errorReport.remove();
  });
  onButtonSubmit.disabled = false;
};

export const setUserFormSubmit = (onSuccess) => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      onButtonSubmit.disabled = true;
      sendData(() => onSuccess(),getErrorReport,new FormData(evt.target),);
    }
  });
};
