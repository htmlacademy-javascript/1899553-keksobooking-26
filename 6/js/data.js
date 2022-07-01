import {getRandomInRange,getRandomFloat, getRandomElement, getRandomLength} from './util.js';

const TITLE = ['Рядом с метро', 'В центре города', 'Тихий район', 'Рядом с парком'];
const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTION = ['отличный вид', 'светлая квартира'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

let i = 0;

const createObject = function () {
  i++;
  const AUTHOR = {
    avatar: `img/avatars/user${i >= 10 ? i : '0' + i}.png`,
  };
  const PRICE = getRandomInRange(1500, 5999);
  const ROOMS = getRandomInRange(1, 6);
  const GUESTS = getRandomInRange(1, 12);
  const LOCATION = {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5)
  };

  return {
    author: AUTHOR,
    offer: {
      title: getRandomElement(TITLE),
      address:`${LOCATION.lat}, ${LOCATION.lng}`,
      price: PRICE,
      type: getRandomElement(TYPE),
      rooms: ROOMS,
      guests: GUESTS,
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKIN),
      features: getRandomElement(FEATURES),
      description: getRandomElement(DESCRIPTION),
      photos: getRandomLength(PHOTOS),
    },
    location: LOCATION,
  };
};

const NUMBER_OF_OBJECTS = 10;

const createObjects = Array.from({ length: NUMBER_OF_OBJECTS }, createObject);
console.log(createObjects);

export {createObjects};
