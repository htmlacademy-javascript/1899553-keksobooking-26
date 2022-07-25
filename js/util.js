// function getRandomInRange(min, max) {
//   if (min >= 0 && max > min) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   }
//   else {
//     console.log('Error');
//   }
// }

// console.log(getRandomInRange(1, 101));

// function getRandomFloat(min, max, float) {
//   if (min >= 0 && max > min) {
//     return (Math.random() * (max - min) + min).toFixed(float);
//   }
//   else {
//     console.log('Error');
//   }
// }

// console.log(getRandomFloat(1.1, 1.2, 2));

// const getRandomElement = function (elements) {
//   return elements[getRandomInRange(0, elements.length - 1)];
// };

// const getRandomLength = function (array) {
//   const lengthArray = getRandomInRange(1, array.length - 1);
//   return array.slice(0, lengthArray);
// };

const ALERT_SHOW_TIME = 3000;

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'pink';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// export { getRandomInRange, getRandomFloat, getRandomElement, getRandomLength };
