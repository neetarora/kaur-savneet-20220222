
const { Joi, docSchema } = require('../../utils/validators');

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

let create = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    profilePicture: docSchema,
  })
};

let getById = {
  params: Joi.object().keys({
    userId: Joi.string().mongoDBObjectID()
  })
};

let forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required()
  })
};

let verifyCode = {
  query: Joi.object().keys({
    email: Joi.string().email().required(),
    code: Joi.string().required()
  })
};

module.exports = {
  login,
  create,
  getById,
  forgotPassword,
  verifyCode,
};
