function getRandomInRange(min, max) {
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  else {
    console.log('Error');
  }
}

console.log(getRandomInRange(1, 101));

function getRandomFloat(min, max, float) {
  if (min >= 0 && max > min) {
    return (Math.random() * (max - min) + min).toFixed(float);
  }
  else {
    console.log('Error');
  }
}

console.log(getRandomFloat(1.1, 1.2, 2));

const getRandomElement = function (elements) {
  return elements[getRandomInRange(0, elements.length - 1)];
};

const getRandomLength = function (array) {
  const lengthArray = getRandomInRange(0, array.length - 1);
  return array.slice(0, lengthArray);
};

const createObject = function () {
  const RANDOM_NUMBER = getRandomInRange(1, 10);
  const ZERO = '0';
  const AUTHOR = {
    avatar: `img / avatars / user${RANDOM_NUMBER === 10 ? RANDOM_NUMBER : ZERO + RANDOM_NUMBER}.png`
  }
  const TITLE = ['Рядом с метро', 'В центре города', 'Тихий район', 'Рядом с парком'];
  const LOCATION = {
    lat: getRandomFloat(35.65, 35.7, 5),
    lng: getRandomFloat(139.7, 139.8, 5)
  };
  const ADDRESS = LOCATION;
  const PRICE = getRandomInRange(1500, 5999);
  const TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
  const ROOMS = getRandomInRange(1, 6);
  const GUESTS = getRandomInRange(1, 12);
  const CHECKIN = ['12:00', '13:00', '14:00'];
  const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const DESCRIPTION = ['отличный вид', 'светлая квартира'];
  const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


  return {
    author: AUTHOR,
    offer: {
      title: getRandomElement(TITLE),
      address: LOCATION,
      price: PRICE,
      type: getRandomElement(TYPE),
      rooms: ROOMS,
      guests: GUESTS,
      checkin: CHECKIN,
      checkout: CHECKIN,
      features: getRandomElement(FEATURES),
      description: getRandomElement(DESCRIPTION),
      photos: getRandomLength(PHOTOS),
    },
    location: LOCATION,
  };
};

const NUMBER_OF_OBJECTS = 10;

const createObjects = Array.from({length:NUMBER_OF_OBJECTS}, createObject);
const objectsFunc = () => createObjects;

console.log(objectsFunc());
