
const bcrypt = require('bcryptjs');
const Q = require('q');

let hashPassword = (password) => {
  const deffered = Q.defer();
  let salt = Number(process.env.SECRET_SALT) || 10;

  bcrypt.hash(password, salt, function (error, hash) {
    if (error) deffered.reject(error);
    else deffered.resolve(hash);
  });

  return deffered.promise;
};

let comparePassword = (inputPassword, storedPassword) => {
  const deffered = Q.defer();

  bcrypt.compare(inputPassword, storedPassword, function (error, result) {
    if (error) deffered.reject(error);
    else deffered.resolve(result);
  });

  return deffered.promise;
};

module.exports = {
  hashPassword,
  comparePassword
};
