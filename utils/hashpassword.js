/* Bcrypt */

const bcrypt = require('bcrypt');

/* HashPassword */

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(reqPassword, hashedPassword) {
  return bcrypt.compareSync(reqPassword, hashedPassword);
}

module.exports = {hashPassword, isValidPassword}
