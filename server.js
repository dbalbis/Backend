const express = require('express');

const { Router } = express;

const path = require('path');

const app = express();
const rutas = require('./routes/index.js');
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', rutas);

/* Config Pug */
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.listen(puerto, () => {
  console.log(`Servidor escuchando en puerto: ${puerto}`);
});
