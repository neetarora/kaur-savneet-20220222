
const model = require('./model');

let findByEmail = async (email) => {
  return model.findOne({ email });
};

let getUserById = async (userId) => {
  return model.getById(userId);
};

let createObj = async (data) => {
  return model.createObj(data);
};

module.exports = {
  findByEmail,
  getUserById,
  createObj
};
