'use strict';

const getRandomInt = (min, max) =>{
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [someArray[i], someArray[j]] = [someArray[j], someArray[i]];
  }
  return someArray;
};

const createDate = () => {
  return new Date(`${getRandomInt(1, 12)}-${getRandomInt(1, 30)}-${getRandomInt(1950, 2020)}`);
};

module.exports = {
  getRandomInt,
  shuffle,
  createDate
};
