'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

let init = () => {
  const app = express();

  app.use(require('./requestTracker'));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(helmet());

  let callback = () => {
    app.use(require('./routeNotFound'));
    app.use(require('./errorHandler'));
  };

  return { app, callback };
};

module.exports = init;
