const util = require('util');

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

  const numeros = {};
  for (let i = 1; i <= cant; i++) {
    const number = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    if (!numeros[number]) {
      numeros[number] = 1;
    } else {
      numeros[number]++;
    }
  }
  logger.info(
    util.inspect(numeros, { showHidden: false, depth: null, colors: true })
  );

  res.render('randomNumbers', { numeros });
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
