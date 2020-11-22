'use strict';
const {Router} = require(`express`);
const myRoutes = new Router();

myRoutes.get(`/comments`, (req, res) => res.render(`my/comments`));
myRoutes.get(`/`, (req, res) => res.render(`my/my`));

module.exports = myRoutes;
