

const { httpCode } = require('../../constants/http');

const ERROR_CODES = {
  LOGIN_EMAIL_OR_PASSWORD_INCORRECT: 1000,
  INVALID_EMAIL_OR_VERIFICATION_CODE: 1002,
  INVALID_EMAIL_OR_RESET_PASSWORD_CODE: 1003,
  EXPIRED_RESET_PASSWORD_CODE: 1004,
};

const ERROR_INFO = {
  [ERROR_CODES.LOGIN_EMAIL_OR_PASSWORD_INCORRECT]: { message: 'Incorrect Email/Password', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.INVALID_EMAIL_OR_VERIFICATION_CODE]: { message: 'Invalid Email or Verification Code', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.INVALID_EMAIL_OR_RESET_PASSWORD_CODE]: { message: 'Invalid Email or Reset Password Code', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.EXPIRED_RESET_PASSWORD_CODE]: { message: 'Password Code has expired', httpCode: httpCode.UNAUTHORIZED },
};

module.exports = {
  ERROR_CODES,
  ERROR_INFO
};
