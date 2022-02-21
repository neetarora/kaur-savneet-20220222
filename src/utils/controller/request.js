
const AppError = require('../appError');
const { ERROR_CODES } = require('../../constants/error');


let validateRequest = (request, validator) => {
  let { params, query, body, files } = request;
  let returnObj = {};

  if (validator.params) {
    let result = validator.params.validate(params, { convert: false });
    if (result.error) if (result.error) throw new AppError(ERROR_CODES.REQUEST_PARAMS_INVALID, { message: result.error });

    returnObj.params = params;
  }
  if (validator.query) {
    let result = validator.query.validate(query, { convert: true });
    if (result.error) throw new AppError(ERROR_CODES.REQUEST_QUERY_INVALID, { message: result.error });
    returnObj.query = result.value;
  }
  if (validator.body) {
    let result = validator.body.validate(body, { convert: false, allowUnknown: false, stripUnknown: { arrays: true, objects: false } });
    if (result.error) throw new AppError(ERROR_CODES.REQUEST_BODY_INVALID, { message: result.error });

    returnObj.body = result.value;
  }

  return returnObj;
};

module.exports = {
  validateRequest
};
