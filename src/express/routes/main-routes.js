'use strict';
const {Router} = require(`express`);
const mainRoutes = new Router();

mainRoutes.get(`search`, (req, res) => res.send(`/search`));
mainRoutes.get(`login`, (req, res) => res.send(`/login`));
mainRoutes.get(`register`, (req, res) => res.send(`/register`));

module.exports = mainRoutes;

