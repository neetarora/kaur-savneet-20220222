'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const schemaHelpers = require('./schemaHelpers');
const logger = require('../utils/logger');

module.exports = () => {

  let dbOptions = {
    dbName: process.env.MONGO_DATABASE_NAME,
    // user:process.env.MONGO_DATABASE_USER,
    // pass:process.env.MONGO_DATABASE_PASSWORD,
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: process.env.MONGO_POOL_SIZE || 10,
    autoIndex: true,
    useUnifiedTopology: true
  };

  mongoose.connect(process.env.MONGO_URI, dbOptions);
  const db = mongoose.connection;

  db.on('connected', () => {
    logger('info', `Mongo connection established on port ${process.env.MONGO_URI}`);
  });

  db.on('connection', () => {
    logger('info', `Extablishing mongo connection on port ${process.env.MONGO_URI}`);
  });

  db.on('error', (error) => {
    if (error) {
      logger('error', `connection error on: ${process.env.MONGO_URI}`, { error });
    }
  });

  // When the connection is disconnected
  db.on('disconnected', () => {
    logger('info', 'Database connection disconnected');
  });

  db.on('reconnectFailed', (error) => {
    db.close(() => {
      logger('error', `Reconnection failed on: ${process.env.MONGO_URI}`, { error });
      process.exit(0);
    });
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    db.close(() => {
      logger('info', 'Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });

  mongoose.set('debug', process.env.MONGOOSE_DEBUG === 'true');
  mongoose.plugin(schemaHelpers);
};
