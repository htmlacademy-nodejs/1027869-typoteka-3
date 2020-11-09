'use strict';
const {getRandomInt, shuffle, createDate} = require(`../../utils`);
const {DEFAULT_COUNT, FILE_NAME} = require(`../../constants`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const FILE_ANNOUNCE_PATH = `./data/announce.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(e));
    return [];
  }
};

const generateOffers = (count, titles, categories, announce) => (
  new Array(count).fill(``).map(()=>({
    category: [categories[getRandomInt(0, categories.length - 1)]],
    announce: shuffle(announce).slice(1, 3).join(` `),
    fullText: shuffle(announce).slice(1, 5).join(` `),
    createdDate: createDate(),
    title: titles[getRandomInt(0, titles.length - 1)],
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const announce = await readContent(FILE_ANNOUNCE_PATH);

    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, announce));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
