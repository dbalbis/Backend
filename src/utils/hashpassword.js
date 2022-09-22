import bcrypt from 'bcrypt';
/* Bcrypt */


/* HashPassword */

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(reqPassword, hashedPassword) {
  return bcrypt.compareSync(reqPassword, hashedPassword);
}

export  { hashPassword, isValidPassword };
