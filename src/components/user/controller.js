
const { successResponse } = require('../../utils/controller/response');
const httpCode = require('../../constants/http').httpCode;
const service = require('./service');
const validator = require('./validator');
const { validateRequest } = require('../../utils/controller/request');

let login = async (request, response) => {
  validateRequest(request, validator.login);

  let userObj = await service.login(request.body.email, request.body.password);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let create = async (request, response) => {
  validateRequest(request, validator.create);

  let userObj = await service.create(request.body);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};

let getById = async (request, response) => {
  validateRequest(request, validator.getById);

  let userObj = await service.getUserById(request.params.userId);
  successResponse(request, response, httpCode.OK_REQUEST, userObj);
};


let forgotPassword = async (request, response) => {
  validateRequest(request, validator.forgotPassword);

  let result = await service.forgotPassword(request.body.email);
  successResponse(request, response, httpCode.OK_REQUEST, result);
};

let verifyCode = async (request, response) => {
  validateRequest(request, validator.verifyCode);
  let result = await service.verifyCode(request.query.email, request.query.code);
  successResponse(request, response, httpCode.OK_REQUEST, result);
};


module.exports = {
  login,

  create,
  getById,

  verifyCode,
  forgotPassword,
};
