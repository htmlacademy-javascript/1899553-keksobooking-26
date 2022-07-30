const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const pattern = document.querySelector('#card').content.querySelector('.popup');
const TypeOfHousing = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель'
};

export const drawObjects = (cards) => {
  const cardTemplate = pattern.cloneNode(true);
  const featuresRandom = cards.offer.features;
  const popupFeatures = cardTemplate.querySelector('.popup__features');
  const popupFeature = popupFeatures.querySelectorAll('.popup__feature');
  const photosRandom = cards.offer.photos;
  const photos = cardTemplate.querySelector('.popup__photos');
  const photo = photos.querySelector('.popup__photo');
  if (!photosRandom) {
    photos.remove();
  }
  else {
    photos.remove();
    photosRandom.forEach((picture) => {
      const photoClone = photo.cloneNode();
      photoClone.src = picture;
      photoClone.width = PHOTO_WIDTH;
      photoClone.height = PHOTO_HEIGHT;
      photoClone.alt = 'Фотография жилья';
      photos.appendChild(photoClone);
    });
  }
  if (!featuresRandom) {
    popupFeatures.remove();
  } else {
    popupFeature.forEach((popupFeatureItem) => {
      const isReal = featuresRandom.some((feature) => popupFeatureItem.classList.contains(`popup__feature--${feature}`));
      if (!isReal) {
        popupFeatureItem.remove();
      }
      if (!featuresRandom.length) {
        popupFeatures.classList.add('hidden');
      }
    });
  }
  if (cards.offer.description) {
    cardTemplate.querySelector('.popup__description').textContent = cards.offer.description;
  }
  else {
    cardTemplate.querySelector('.popup__description').remove();
  }

  cardTemplate.querySelector('.popup__title').textContent = cards.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = cards.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = `${cards.offer.price} ₽/ночь`;
  cardTemplate.querySelector('.popup__type').textContent = TypeOfHousing[cards.offer.type];
  cardTemplate.querySelector('.popup__text--capacity').textContent = `${cards.offer.rooms} комнаты для ${cards.offer.guests} гостей`;
  cardTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${cards.offer.checkin}, выезд до ${cards.offer.checkout}`;
  cardTemplate.querySelector('.popup__avatar').src = cards.author.avatar;
  return cardTemplate;
};
