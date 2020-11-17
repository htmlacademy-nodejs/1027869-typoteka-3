'use strict';

const express = require(`express`);

const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const app = express();
const DEFAULT_PORT = 8080;

app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/`, mainRoutes);


app.listen(DEFAULT_PORT);
