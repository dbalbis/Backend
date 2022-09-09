const util = require('util');
const renderArray = require('./randomGenerator');

const logger = require('../logs/logger');

/* FORK */

const { fork } = require('child_process');

/* PATH */
const path = require('path');
const { prototype } = require('module');

function getRoot(req, res) {}

function getLogin(req, res) {
  if (req.isAuthenticated()) {
    logger.info('User logeado ');
    res.redirect('/');
  } else {
    logger.info('user NO logueado');
    res.sendFile(__dirname + '/views/login.html');
  }
}

function postSignup(req, res) {
  const user = req.user;
  logger.info('El user es', user);
  res.redirect('/');
}

function getFailsignup(req, res) {
  logger.error('error en signup');
  res.sendFile(path.join(__dirname, '../public/failsignup.html'));
}

function getFaillogin(req, res) {
  logger.error('error en login');
  res.sendFile(path.join(__dirname, '../public/faillogin.html'));
}

function getLogout(req, res) {
  req.logout();
  res.sendFile(path.join(__dirname, '../public/index.html'));
}

function failRoute(req, res) {
  logger.warn(`Ruta: ${req.url} Método: ${req.method} NO implementada`);
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
