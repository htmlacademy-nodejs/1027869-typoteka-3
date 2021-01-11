"use strict";

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `AEdGW8`,
    "category": [`Без рамки`],
    "announce":
      `Собрать камни бесконечности легко, если вы прирожденный герой. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "fullText":
      `Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха.`,
    "createdDate": `1998-10-08T20:00:00.000Z`,
    "title": `Как собрать камни бесконечности`,
    "comments": [
      {
        "id": `mVE4-Y`,
        "text":
          `Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        "id": `dSTLVV`,
        "text": `Согласен с автором! Планируете записать видосик на эту тему?`,
      },
    ],
  },
  {
    "id": `p62XWe`,
    "category": [`IT`],
    "announce":
      `Простые ежедневные упражнения помогут достичь успеха. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "fullText":
      `Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Золотое сечение — соотношение двух величин, гармоническая пропорция. Достичь успеха помогут ежедневные повторения.`,
    "createdDate": `1986-12-14T21:00:00.000Z`,
    "title": `Учим HTML и CSS`,
    "comments": [
      {
        "id": `2R_5VT`,
        "text":
          `Хочу такую же футболку :-) Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        "id": `2NAuKf`,
        "text":
          `Мне кажется или я уже читал это где-то? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
    ],
  },
  {
    "id": `K-PtQx`,
    "category": [`Музыка`],
    "announce":
      `Первая большая ёлка была установлена только в 1938 году. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "fullText":
      `Программировать не настолько сложно, как об этом говорят. Это один из лучших рок-музыкантов. Как начать действовать? Для начала просто соберитесь. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
    "createdDate": `2009-12-16T21:00:00.000Z`,
    "title": `Как начать программировать`,
    "comments": [
      {
        "id": `5AzSwd`,
        "text":
          `Плюсую, но слишком много буквы! Хочу такую же футболку :-) Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
      {"id": `8cDrCe`, "text": `Совсем немного...`},
    ],
  },
  {
    "id": `B1Voxf`,
    "category": [`Кино`],
    "announce":
      `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "fullText":
      `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?, Золотое сечение — соотношение двух величин, гармоническая пропорция. Как начать действовать? Для начала просто соберитесь. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
    "createdDate": `2003-01-05T21:00:00.000Z`,
    "title": `Самый лучший музыкальный альбом этого года`,
    "comments": [
      {
        "id": `5zpQr-`,
        "text": `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
      {
        "id": `x2l5zF`,
        "text":
          `Плюсую, но слишком много буквы! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете.`,
      },
      {"id": `Rqw6Lv`, "text": `Это где ж такие красоты?`},
      {
        "id": `qhn9kU`,
        "text":
          `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного...`,
      },
      {
        "id": `wgrqZt`,
        "text":
          `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`,
      },
    ],
  },
  {
    "id": `mQxJwr`,
    "category": [`IT`],
    "announce":
      `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения.`,
    "fullText":
      `Как начать действовать? Для начала просто соберитесь. Из под его пера вышло 8 платиновых альбомов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
    "createdDate": `1992-10-06T21:00:00.000Z`,
    "title": `Самый лучший музыкальный альбом этого года`,
    "comments": [
      {
        "id": `6AxCbU`,
        "text":
          `Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Это где ж такие красоты?`,
      },
    ],
  },
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "AEdGW8"`, () => expect(response.body[0].id).toBe(`AEdGW8`));

});

describe(`API returns an article with given id`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/AEdGW8`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Как собрать камни бесконечности"`, () => expect(response.body.title).toBe(`Как собрать камни бесконечности`));

});

describe(`API creates an article if data is valid`, () => {

  const newOffer = {
    id: `AEdGW8`,
    category: `Без рамки`,
    announce:
      `Собрать камни бесконечности легко, если вы прирожденный герой. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    fullText:
      `Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха.`,
    createdDate: `1998-10-08T20:00:00.000Z`,
    title: `Как собрать камни бесконечности`,
    comments: [
      {
        id: `mVE4-Y`,
        text:
          `Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        id: `dSTLVV`,
        text: `Согласен с автором! Планируете записать видосик на эту тему?`,
      },
    ],
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {

  const newArticle = {
    category: `Cосиски`,
    announce:
      `Собери все сосиски`,
    fullText:
      `Чтобы собрать все сосиски разом возьми корзинку`,
    createdDate: `11/10/2021`,
    title: `Как собрать сосисон`,
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });

});

describe(`API changes existent article`, () => {

  const newArticle = {
    id: `AEdGW8`,
    category: `Без рамки`,
    announce:
      `Собрать камни бесконечности легко, если вы прирожденный герой. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    fullText:
      `Золотое сечение — соотношение двух величин, гармоническая пропорция. Из под его пера вышло 8 платиновых альбомов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха.`,
    createdDate: `1998-10-08T20:00:00.000Z`,
    title: `Как собрать камни бесконечности`,
    comments: [
      {
        id: `mVE4-Y`,
        text:
          `Это где ж такие красоты? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`,
      },
      {
        id: `dSTLVV`,
        text: `Согласен с автором! Планируете записать видосик на эту тему?`,
      },
    ],
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/AEdGW8`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Offer is really changed`, () => request(app)
    .get(`/articles/AEdGW8`)
    .expect((res) => expect(res.body.title).toBe(`Как собрать камни бесконечности`))
  );

});


describe(`API correctly deletes an article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/p62XWe`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`p62XWe`));

  test(`Offer count is 5 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(5))
  );

});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/AEdGW8/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 2 comments`, () => expect(response.body.length).toBe(2));

  test(`First comment's id is "mVE4-Y"`, () => expect(response.body[0].id).toBe(`mVE4-Y`));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/B1Voxf/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/B1Voxf/comments`)
    .expect((res) => expect(res.body.length).toBe(6))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/NOEXST/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
    .post(`/articles/mQxJwr/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/K-PtQx/comments/5AzSwd`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`5AzSwd`));

  test(`Comments count is 1 now`, () => request(app)
    .get(`/articles/K-PtQx/comments`)
    .expect((res) => expect(res.body.length).toBe(1))
  );

});

test(`API refuses to delete non-existent comment`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/GxdTgz/comments/NOEXST`)
    .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete a comment to non-existent article`, () => {

  const app = createAPI();

  return request(app)
    .delete(`/articles/NOEXST/comments/kqME9j`)
    .expect(HttpCode.NOT_FOUND);

});
