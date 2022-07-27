import {sendData} from './api.js';
import {clearMarkers, renderCards} from './map.js';
import {getData} from './api.js';

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
const VALUE_OF_OBJECT = 10;
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
const roomNumber = advertForm.querySelector('#room_number');
const capacityGuests = advertForm.querySelector('#capacity');
const possibleCapacity = {
  1:['1'],
  2:['1', '2'],
  3:['1', '2', '3'],
  100:['0']
};
const words = {
  1: {
    room: 'комната',
    guest: 'для 1 гостя'
  },
  2: {
    room: 'комнаты',
    guest: 'для 1 или 2 гостей'
  },
  3: {
    room: 'комнаты',
    guest: 'для 1 или 3 гостей'
  },
  100: {
    room: 'комнат',
    guest: 'не для гостей'
  },
};
const timeIn = advertForm.querySelector('#timein');
const timeOut = advertForm.querySelector('#timeout');

const pristine = new Pristine(advertForm, {
  classTo:'ad-form__element',
  errorTextParent:'ad-form__element',
  errorTextClass:'ad-form__error-text',
});

//проверка валидности заголовока объявления
const validateTitleNotice = (value) => {
  const minValue = 30;
  const maxValue = 100;
  return value.length >= minValue && value.length <= maxValue;
};

pristine.addValidator(advertForm.querySelector('#title'),validateTitleNotice);

//проверка валидности типа жилья и цены за ночь, руб."

typeOfHousing.addEventListener('change', () => {
  price.placeholder = typeOfHousingPrice[typeOfHousing.value];
  price.min = typeOfHousingPrice[typeOfHousing.value];
  price.value = '';
});

const validatePrice = (value) => value <= maxPrice[typeOfHousing.value] && value>=typeOfHousingPrice[typeOfHousing.value];

const getPriceErrorReport = () => `не менее ${typeOfHousingPrice[typeOfHousing.value]} и не более ${maxPrice[typeOfHousing.value]}`;

pristine.addValidator(price, validatePrice, getPriceErrorReport);

//проверка валидности кол-вфа комнат и мест"
roomNumber.addEventListener('change', () => {
  pristine.validate();
});
const validateCapacity = () => possibleCapacity[roomNumber.value].includes(capacityGuests.value);

const getCapacityErrorReport = () => `${roomNumber.value} ${words[roomNumber.value].room} ${words[roomNumber.value].guest}`;

pristine.addValidator(capacityGuests, validateCapacity, getCapacityErrorReport);

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
  pristine.validate();
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
  pristine.validate();
});

const validateTime = () => timeIn.value === timeOut.value;

pristine.addValidator(timeOut, validateTime);

//функция аткивации формы
const toActiveForm = (isActiveForm) => {
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
const getSuccessReport = () => {
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
  price.placeholder = typeOfHousingPrice[typeOfHousing.value];
  priceSlider.noUiSlider.reset();
  clearMarkers();
  getData ((data)=> {
    renderCards(data.slice(0,VALUE_OF_OBJECT));
  });
};
//функция об неуспешной отправке
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

const blockSubmitButton = () => {
  onButtonSubmit.disabled = true;
  onButtonSubmit.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  onButtonSubmit.disabled = false;
  onButtonSubmit.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  advertForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        getErrorReport,
        new FormData(evt.target),);
    }
  });
};
export {toActiveForm, setUserFormSubmit, getSuccessReport};


