const util = require('util');

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

function getLogout(req, res) {
  req.logout();
  res.sendFile(path.join(__dirname, '../public/index.html'));
}

function failRoute(req, res) {
  res.redirect('/');
}

function getRandoms(req, res) {
  let arrayNumeros = [1];
  let veces = 1;
  cant = Number(req.query.cant || 100000000);

  for (let ciclo = 0; ciclo < cant; ciclo++) {
    if (ciclo < cant) {
      const numero = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
      arrayNumeros.forEach((v) => v === numero && veces++);
      arrayNumeros.push({ Numero: numero, Veces: veces });
    }
  }
  console.log(
    util.inspect(arrayNumeros, { showHidden: false, depth: null, colors: true })
  );

  const renderArray = arrayNumeros;

  res.render('randomNumbers', { renderArray });
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
