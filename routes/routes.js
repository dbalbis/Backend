/* PATH */
const path = require('path');

function getRoot(req, res) {}

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    console.log('User logeado ');
    res.redirect('/');
  } else {
    console.log('user NO logueado');
    res.sendFile(__dirname + '/views/login.html');
  }
}

function postSignup(req, res) {
  const user = req.user;
  console.log('El user es', user);
  res.redirect('/');
}

function getFailsignup(req, res) {
  console.log('error en signup');
  res.sendFile(path.join(__dirname, '../public/failsignup.html'));
}

function getFaillogin(req, res) {
  console.log('error en login');
  res.sendFile(path.join(__dirname, '../public/faillogin.html'));
}

module.exports = {
  getFailsignup,
  postSignup,
  getLogin,
  getFaillogin,
};
