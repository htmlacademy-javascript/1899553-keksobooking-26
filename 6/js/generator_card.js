import { createObjects } from './data.js';

const CardList = document.querySelector('#map-canvas');
const Pattern = document.querySelector('#card').content.querySelector('.popup');
const TypeOfHousing = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

createObjects().forEach((arrayOfObjects) => {

  const Card = Pattern.cloneNode(true);
  const FeaturesRandom = arrayOfObjects.offer.features;
  const PopupFeatures = Card.querySelector('.popup__features');
  const PopupFeature = PopupFeatures.querySelectorAll('.popup__feature');
  const PhotosRandom = arrayOfObjects.offer.photos;
  const Photos = Card.querySelector('.popup__photos');
  const Photo = Photos.querySelector('.popup__photo');
  PhotosRandom.forEach((picture) => {
    const PhotoClone = Photo.cloneNode(true);
    PhotoClone.src = picture;
    Photos.appendChild(PhotoClone);
  });
  photo.remove('popup__photo');
  if (!PhotosRandom.length) { Photos.classList.add('hidden'); }
  PopupFeature.forEach((popupFeatureItem) => {
    const isReal = FeaturesRandom.some((feature) => popupFeatureItem.classList.contains(`popup__feature--${feature}`));
    if (!isReal) {
      popupFeatureItem.remove();
    }
    if (!FeaturesRandom.length) { PopupFeatures.classList.add('hidden'); }
  });
  Card.querySelector('.popup__title').textContent = arrayOfObjects.offer.title;
  Card.querySelector('.popup__text--address').textContent = arrayOfObjects.offer.address;
  Card.querySelector('.popup__text--price').textContent = `${arrayOfObjects.offer.price} ₽/ночь`;
  Card.querySelector('.popup__type').textContent = TypeOfHousing[arrayOfObjects.offer.type];
  Card.querySelector('.popup__text--capacity').textContent = `${arrayOfObjects.offer.rooms} комнаты для ${arrayOfObjects.offer.guests} гостей`;
  Card.querySelector('.popup__text--time').textContent = `Заезд после ${arrayOfObjects.offer.checkin}, выезд до ${arrayOfObjects.offer.checkout}`;
  Card.querySelector('.popup__description').textContent = arrayOfObjects.offer.description;
  Card.querySelector('.popup__avatar').src = arrayOfObjects.author.avatar;
  CardList.appendChild(Card);
});
