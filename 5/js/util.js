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
  const lengthArray = getRandomInRange(1, array.length - 1);
  return array.slice(0, lengthArray);
};

export {getRandomInRange,getRandomFloat, getRandomElement, getRandomLength};
