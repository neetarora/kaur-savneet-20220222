
const { ERROR_CODES } = require('../constants/error');
const AppError = require('../utils/appError');
const jwtUtil = require('../utils/jwt');

module.exports = async function (request, response, next) {
  const authToken = request.headers['authorization'];
  if (!authToken) throw new AppError(ERROR_CODES.AUTH_TOKEN_REQUIRED);

  let payload;
  try {
    payload = await jwtUtil.verifyJWT(authToken);
  }
  catch (error) {
    let errorCode = getJWTErrorCode(error);
    if (errorCode) throw new AppError(errorCode);
    throw error;
  }

  request.user = payload;
  return next();
};

let getJWTErrorCode = (error) => {
  if (error.name == 'JsonWebTokenError') {
    if (error.message == 'invalid signature')
      return ERROR_CODES.JWT_INVALID_SIGNATURE;
    else if (error.message == 'jwt malformed')
      return ERROR_CODES.JWT_INVALID_VALUE;
  }
  else if (error.name == 'TokenExpiredError' && error.message == 'jwt expired') {
    return ERROR_CODES.JWT_EXPIRED;
  }
};