'use strict';
const {getRandomInt, shuffle, createDate} = require(`../../utils`);
const {CATEGORIES, ANNOUNCE, TITLES, DEFAULT_COUNT, FILE_NAME} = require(`../../constants`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);

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
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
