
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const uuid4 = require('uuid4');
const Q = require('q');

//used http://travistidwell.com/jsencrypt/demo/ to generate keys
const publicKey = fs.readFileSync(path.join(__dirname + '/../keys/jwtPublic.key'), 'utf8');
const privateKey = fs.readFileSync(path.join(__dirname + '/../keys/jwtPrivate.key'), 'utf8');

const { USERTYPE_USER } = require('../constants/model');

let options = {
  subject: 'Authentication Token',
  algorithm: 'RS256',
};

let generateJWT = (payload) => {
  const deffered = Q.defer();

  jwt.sign(payload, privateKey, options, (error, token) => {
    if (error) deffered.reject(error);
    else deffered.resolve(token);
  });

  return deffered.promise;
};

let verifyJWT = (token) => {
  const deffered = Q.defer();

  jwt.verify(token, publicKey, options, (error, payload) => {
    if (error) deffered.reject(error);
    else deffered.resolve(payload);
  });

  return deffered.promise;
};

let getExp = (expiryTime) => {
  //expiry time in minutes 
  return Math.floor(Date.now() / 1000) + (expiryTime * 60);
};

let generatePayload = (user, userType) => {
  let payload = {
    userType,
    sessionId: uuid4(),
  };
  if (userType == USERTYPE_USER) {
    payload.userId = user.id;
    payload.exp = getExp(Number(process.env.AUTH_TOKEN_EXPIRATION) || 10);
  }

  return payload;
};

let addAuthToken = async (userObj, userType) => {
  let payload = generatePayload(userObj, userType);
  let jwt = await generateJWT(payload);

  if (userType == USERTYPE_USER ) userObj = userObj.toJSON();
  userObj.authToken = jwt;
  return userObj;
};

module.exports = {
  generateJWT,
  verifyJWT,
  addAuthToken
};
