const express = require('express');

const { Router } = express;

const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const rutas = require('./routes/index.js');
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', rutas);
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname + '/views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
  })
);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

app.listen(puerto, () => {
  console.log(`Servidor escuchando en puerto: ${puerto}`);
});
