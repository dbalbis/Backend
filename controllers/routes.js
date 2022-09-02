const util = require('util');
const renderArray = require('./randomGenerator');

/* FORK */

const { fork } = require('child_process');

/* PATH */
const path = require('path');
const { prototype } = require('module');

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

function getLogout(req, res) {
  req.logout();
  res.sendFile(path.join(__dirname, '../public/index.html'));
}

function failRoute(req, res) {
  res.redirect('/');
}

function getRandoms(req, res) {
  const cant = Number(req.query.cant || 100000000);
  const forked = fork(__dirname + '/randomGenerator.js');
  forked.send(cant);
  forked.on('message', (data) => {
    const renderArray = data;

    res.render('randomNumbers', { renderArray });
  });
}

module.exports = {
  getFailsignup,
  postSignup,
  getLogin,
  getFaillogin,
  getLogout,
  failRoute,
  getRandoms,
};
