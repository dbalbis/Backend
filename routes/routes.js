/* PATH */
const path = require('path');

function getRoot(req, res) {}

function postSignup(req, res) {
  var user = req.user;
  console.log('El user es', user);
}

function getFailsignup(req, res) {
  console.log('error en signup');
  res.sendFile(path.join(__dirname, '../public/failsignup.html'));
}

module.exports = {
  postSignup,
  getFailsignup,
};
