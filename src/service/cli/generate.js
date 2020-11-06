'use strict';
const {getRandomInt, shuffle, createDate} = require(`../../utils`);
const {CATEGORIES, ANNOUNCE, TITLES, DEFAULT_COUNT, FILE_NAME} = require(`../../constants`);


const fs = require(`fs`);

const generateOffers = (count) => (
  new Array(count).fill(``).map(()=>({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    announce: shuffle(ANNOUNCE).slice(1, 3).join(` `),
    fullText: shuffle(ANNOUNCE).slice(1, 5).join(` `),
    createdDate: createDate(),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));
    fs.writeFile(FILE_NAME, content, (err)=> {
      if (err) {
        return console.error(`Can't write data to file...`);
      }
      return console.info(`Operation success. File created.`);
    });
  }

};
