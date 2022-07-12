import { createObjects } from './data.js';

const cardList = document.querySelector('#map-canvas');
const pattern = document.querySelector('#card').content.querySelector('.popup');
const TypeOfHousing = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

export const drawObjects = (cards) => {

  cards.forEach((card) => {
    const cardtemplate = pattern.cloneNode(true);
    const featuresRandom = arrayOfObjects.offer.features;
    const popupFeatures = cardtemplate.querySelector('.popup__features');
    const popupFeature = popupFeatures.querySelectorAll('.popup__feature');
    const photosRandom = arrayOfObjects.offer.photos;
    const photos = cardtemplate.querySelector('.popup__photos');
    const photo = photos.querySelector('.popup__photo');
    photosRandom.forEach((picture) => {
      const photoClone = photo.cloneNode(true);
      photoClone.src = picture;
      photos.appendChild(photoClone);
    });
    photo.remove('popup__photo');
    if (!photosRandom.length) { photos.classList.add('hidden'); }
    popupFeature.forEach((popupFeatureItem) => {
      const isReal = featuresRandom.some((feature) => popupFeatureItem.classList.contains(`popup__feature--${feature}`));
      if (!isReal) {
        popupFeatureItem.remove();
      }
      if (!featuresRandom.length) { popupFeatures.classList.add('hidden'); }
    });
    cardtemplate.querySelector('.popup__title').textContent = arrayOfObjects.offer.title;
    cardtemplate.querySelector('.popup__text--address').textContent = arrayOfObjects.offer.address;
    cardtemplate.querySelector('.popup__text--price').textContent = `${arrayOfObjects.offer.price} ₽/ночь`;
    cardtemplate.querySelector('.popup__type').textContent = TypeOfHousing[arrayOfObjects.offer.type];
    cardtemplate.querySelector('.popup__text--capacity').textContent = `${arrayOfObjects.offer.rooms} комнаты для ${arrayOfObjects.offer.guests} гостей`;
    cardtemplate.querySelector('.popup__text--time').textContent = `Заезд после ${arrayOfObjects.offer.checkin}, выезд до ${arrayOfObjects.offer.checkout}`;
    cardtemplate.querySelector('.popup__description').textContent = arrayOfObjects.offer.description;
    cardtemplate.querySelector('.popup__avatar').src = arrayOfObjects.author.avatar;
    cardList.appendChild(cardtemplate);
  });
}
