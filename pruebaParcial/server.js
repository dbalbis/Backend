const express = require('express');
const app = express();
const port = 8080;
const productsRouter = require('./routes/productsRouter.js');
const cartRouter = require('./routes/cartRouter.js');
const fs = require('fs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

/* Rutas */

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartRouter);

/* Server */
app.listen(port, (err) => {
  if (err) {
    console.log(`Se produjo un error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor escuchando puerto: ${port}`);
  }
});
