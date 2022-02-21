
const { ERROR_INFO } = require('../constants/error');

class AppError extends Error {
  constructor(code, { message, originalError, metaData } = {}) {
    if (!code)
      throw new Error('Invalid call to AppError');

    super(message || ERROR_INFO[code].message);

    this.customErrorCode = code;
    this.metaData = metaData ? metaData : {};

    if (ERROR_INFO[code].httpCode)
      this.httpCode = ERROR_INFO[code].httpCode;

    if (originalError) {
      this.originalError = originalError;
    }
  }
}

module.exports = AppError;
