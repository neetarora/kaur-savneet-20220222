'use strict';

const FORMAT = require('string-format');
FORMAT.extend(String.prototype);

String.prototype.customFormat = function (modifiers) {
  let str = this;
  let regexExp;
  for (let key in modifiers) {
    regexExp = new RegExp(`{{${key}}}`, 'g');
    str = str.replace(regexExp, modifiers[key]);
  }
  return str;
};

const dotenv = require('dotenv');
const { GracefulShutdownManager } = require('@moebius/http-graceful-shutdown');

dotenv.config();
const { logger, initialiseApp } = require('./utils');

let { app, callback } = initialiseApp({
  initialiseServer: true,
  initializeMongo: true,
});

app.use(`/`, require('./apis'));
callback();

const server = app.listen(process.env.SERVER_PORT, () => {
  logger('info', `Server running on ${process.env.SERVER_PORT}`);
});

const shutdownManager = new GracefulShutdownManager(server);
process.on('SIGINT', () => {
  shutdownManager.terminate(() => {
    logger('info', 'Server is gracefully terminated');
  });
});
