'use strict';

const controllers = require('./controllers');
const routes = require('./routes');
const middlewares = require('./middlewares');
const services = require('./services');

module.exports = {
  controllers,
  routes,
  services,
  middlewares,
};
