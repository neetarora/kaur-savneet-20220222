'use strict';

const uuid = require('uuid4');

const logger = require('../logger');

module.exports = function (request, response, next) {
  request.headers['requestid'] = uuid();

  let startTime = Date.now();
  let requestUrl = request.url;

  let requestPayload = {
    method: request.method,
    url: requestUrl,
    ip: request.headers['x-forwarded-for'] || request.ip,
    requestId: request.headers['requestid']
  };

  logger('info', `REQUEST :: ${request.method} ${requestUrl}`, requestPayload);

  response.on('finish', function () {
    logger('info', `RESPONSE :: ${request.method} ${requestUrl}`, {
      ...requestPayload,
      timeTaken: Date.now() - startTime + 'ms'
    });
  });

  next();
};
