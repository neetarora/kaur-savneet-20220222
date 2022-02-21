
const { errorResponse } = require('../controller/response');

module.exports = function (error, request, response, next) {
  return errorResponse(request, response, error);
};