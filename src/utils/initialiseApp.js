
const initialiseServer = require('./server');
const mongo = require('../mongo');

let init = (options) => {
  let server;
  if (options.initialiseServer) server = initialiseServer();
  if (options.initializeMongo) mongo.connection();

  return server;
};

module.exports = init;

