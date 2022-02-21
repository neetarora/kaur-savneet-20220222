
const { errorResponse } = require('../utils/controller/response');

module.exports = (controller) => {
  return async (request, response, next) => {
    try {
      await controller(request, response, next);
    }
    catch (error) {
      return errorResponse(request, response, error);
    }
  };
};
