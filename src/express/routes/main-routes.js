'use strict';
const {Router} = require(`express`);
const mainRoutes = new Router();

mainRoutes.get(`/login`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/register`, (req, res) => res.render(`sign-up`));
mainRoutes.get(`/categories`, (req, res) => res.render(`all-categories`));
mainRoutes.get(`/search`, (req, res) => res.render(`search`));
mainRoutes.get(`/`, (req, res) => res.render(`main`));

module.exports = mainRoutes;

