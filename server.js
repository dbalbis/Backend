const express = require('express');
const { Router } = express;



const app = express();
const rutas = require('./routes/index.js');
const puerto = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/', rutas);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en puerto: ${puerto}`);
});

/* Mostrar algo en / */
app.get('/', (req, res) => {
  res.send('Hola soy el desafio de Diego Balbis');
});
