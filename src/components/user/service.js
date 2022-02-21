
const DAL = require('./DAL');
const jwtUtil = require('../../utils/jwt');
const bcrypt = require('../../utils/bcrypt');
const AppError = require('../../utils/appError');
const { ERROR_CODES } = require('./error');
const { ERROR_CODES: COMMON_ERROR_CODES } = require('../../constants/error');
const uuid = require('uuid4');

let login = async (email, password) => {
  let userObj = await DAL.findByEmail(email);
  if (!userObj) throw new AppError(ERROR_CODES.LOGIN_EMAIL_OR_PASSWORD_INCORRECT);
  if (!(await bcrypt.comparePassword(password, userObj.password))) {
    throw new AppError(ERROR_CODES.LOGIN_EMAIL_OR_PASSWORD_INCORRECT);
  }

  userObj = await jwtUtil.addAuthToken(userObj, userObj.userType);
  return userObj;
};

let getUserById = async (userId) => {
  let userObj = await DAL.getUserById(userId);
  if (!userObj) throw new AppError(COMMON_ERROR_CODES.OBJECT_NOT_FOUND);

  return userObj;
};

let create = async (data) => {
  data.password = await bcrypt.hashPassword(data.password);
  data.userType = 1;
  let userObj = await DAL.createObj(data);

  userObj = await jwtUtil.addAuthToken(userObj, userObj.userType);
  return userObj;
};


let forgotPassword = async (email) => {
  let userObj = await DAL.findByEmail(email);
  if (!userObj) throw new AppError(COMMON_ERROR_CODES.OBJECT_NOT_FOUND);

  userObj.resetPasswordCode = uuid();
  userObj.passwordCodeGeneratedAt = new Date();
  userObj = await userObj.save();
  let resetPasswordLink = process.env.FRONTEND_RESET_PASSWORD_URL.format({
    email,
    code: userObj.resetPasswordCode,
  });

  userObj = userObj.toJSON();
  userObj.resetPasswordLink = resetPasswordLink;

  return userObj;
};

let verifyCode = async (email, resetPasswordCode) => {
  let userObj = await DAL.findByEmail(email);
  if (!userObj || userObj.resetPasswordCode != resetPasswordCode)
    throw new AppError(ERROR_CODES.INVALID_EMAIL_OR_RESET_PASSWORD_CODE);

  let time_interval = (new Date().getTime()-userObj.passwordCodeGeneratedAt.getTime())/(1000*60); //get the interval in minutes
  if(time_interval>process.env.EXPIRE_PASSWORD_CODE_TIME){
    throw new AppError(ERROR_CODES.EXPIRED_RESET_PASSWORD_CODE);
  }
  return true;
};


module.exports = {
  login,
  getUserById,
  create,
  verifyCode,
  forgotPassword
};
