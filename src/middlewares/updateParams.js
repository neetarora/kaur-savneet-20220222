module.exports = function (request, response, next) {
  if (!request.customParams) {
    request.customParams = {};
  }
  for (let key in request.params) {
    request.customParams[key] = request.params[key];
  }
  next();
};