
const { Loggly } = require('winston-loggly-bulk');

const AppError = require('../appError');

class LogglyTransport extends Loggly {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    setImmediate(() => { this.emit('logged', info); });

    if (info.error) {
      let error = info.error;

      info.error = {
        message: error.message,
        stack: error.stack ? error.stack : (error.error ? error.error.stack : null),
      };
      if (error instanceof AppError) {
        info.error.customErrorCode = error.customErrorCode;
        if (error.httpCode) info.error.httpCode = error.httpCode;
        if (error.metaData) info.error.metaData = error.metaData;
        if (error.originalError) {
          info.error.originalError = {
            message: error.originalError.message,
            stack: error.originalError.stack ? error.originalError.stack : (error.originalError.error ? error.originalError.error.stack : null)
          };
        }
      }
    }

    super.log(info, callback);
  }
}

module.exports = LogglyTransport;
