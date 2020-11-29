'use strict';
const {getRandomInt, shuffle, createDate} = require(`../../utils`);
const {DEFAULT_COUNT, FILE_NAME, MAX_ID_LENGTH, MAX_COMMENTS} = require(`../../constants`);
const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const FILE_ANNOUNCE_PATH = `./data/announce.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const {nanoid} = require(`nanoid`);


const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(e));
    return [];
  }
};
const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, categories, announce, comments) => (
  new Array(count).fill(``).map(()=>({
    id: nanoid(MAX_ID_LENGTH),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    announce: shuffle(announce).slice(1, 3).join(` `),
    fullText: shuffle(announce).slice(1, 5).join(` `),
    createdDate: createDate(),
    title: titles[getRandomInt(0, titles.length - 1)],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const announce = await readContent(FILE_ANNOUNCE_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);


    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const options = [countOffer, titles, categories, announce, comments];
    const content = JSON.stringify(generateOffers(...options));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
