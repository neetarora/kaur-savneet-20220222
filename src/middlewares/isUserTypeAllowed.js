
const { ERROR_CODES } = require('../constants/error');
const AppError = require('../utils/appError');


module.exports = function (...allowedUserTypes) {
  return function (request, response, next) {
    if (allowedUserTypes.indexOf(request.user.userType) == -1) {
      throw new AppError(ERROR_CODES.USERTYPE_NOT_ALLOWED);
    }
    return next();
  };
};
