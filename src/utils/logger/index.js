'use strict';

const WINSTON = require('winston');
const ConsoleTransport = require('./consoleTransport');
const LogglyTransport = require('./logglyTransport');

let transports = [];
if (process.env.ENABLE_CONSOLE_LOGS == 'true') {
  transports.push(new ConsoleTransport());
}

let winstonLogger = WINSTON.createLogger({
  level: 'info',
  format: WINSTON.format.json(),
  transports: transports
});


let logger = (logLevel = 'info', message, metadata = {}) => {
  metadata.timestamp = new Date();
  winstonLogger.log(logLevel, message, metadata);
};

logger('info', 'Logger initiated');

module.exports = logger;
