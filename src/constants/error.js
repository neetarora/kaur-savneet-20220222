
const { httpCode } = require('./http');

const {
  ERROR_CODES: USER_COMPONENT_ERROR_CODES,
  ERROR_INFO: USER_COMPONENT_ERROR_INFO,
} = require('../components/user/error');

const ERROR_CODES = {
  ROUTE_NOT_FOUND: 2000,
  OBJECT_NOT_FOUND: 2001,

  AUTH_TOKEN_REQUIRED: 2100,
  JWT_INVALID_VALUE: 2101,
  JWT_EXPIRED: 2102,
  JWT_INVALID_SIGNATURE: 2103,
  INVALID_CLIENT_TYPE: 2104,
  SESSION_EXPIRED: 2106,

  USERTYPE_NOT_ALLOWED: 2200,

  REQUEST_BODY_INVALID: 2300,
  REQUEST_QUERY_INVALID: 2301,
  REQUEST_PARAMS_INVALID: 2302,

  ...USER_COMPONENT_ERROR_CODES
};

const ERROR_INFO = {
  [ERROR_CODES.ROUTE_NOT_FOUND]: { message: 'API route not found', httpCode: httpCode.NOT_FOUND },
  [ERROR_CODES.OBJECT_NOT_FOUND]: { message: 'Object not found', httpCode: httpCode.NOT_FOUND },

  [ERROR_CODES.AUTH_TOKEN_REQUIRED]: { message: 'Authentication Token required', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.JWT_INVALID_SIGNATURE]: { message: 'This token hasn\'t been generated from our system', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.JWT_INVALID_VALUE]: { message: 'Invalid value for JWT token', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.JWT_EXPIRED]: { message: 'JWT expired. Please Login again', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.INVALID_CLIENT_TYPE]: { message: 'Invalid Client-Type', httpCode: httpCode.UNAUTHORIZED },
  [ERROR_CODES.SESSION_EXPIRED]: { message: 'Your session has expired. Please login again', httpCode: httpCode.UNAUTHORIZED },

  [ERROR_CODES.USERTYPE_NOT_ALLOWED]: { message: 'This type of user is not allowed to perform this action', httpCode: httpCode.FORBIDDEN },

  [ERROR_CODES.REQUEST_BODY_INVALID]: { message: 'Invalid body in request', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.REQUEST_QUERY_INVALID]: { message: 'Invalid query in request', httpCode: httpCode.BAD_REQUEST },
  [ERROR_CODES.REQUEST_PARAMS_INVALID]: { message: 'Invalid params in API route', httpCode: httpCode.BAD_REQUEST },

  ...USER_COMPONENT_ERROR_INFO
};

module.exports = {
  ERROR_CODES,
  ERROR_INFO
};
