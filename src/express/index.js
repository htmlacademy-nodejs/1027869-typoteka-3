'use strict';

const express = require(`express`);
const path = require(`path`);

const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const app = express();
const DEFAULT_PORT = 8080;

app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(`/`, mainRoutes);

const PUBLIC_DIR = `public`;
app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.use((req, res) => res.status(400).render(`errors/404`));
app.use((req, res) => res.status(500).render(`errors/500`));

app.listen(DEFAULT_PORT);
