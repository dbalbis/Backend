const { Router } = require('express');
const router = Router();
/* Importando Clases y Productos */
const ContenedorProductos = require('../Controllers/contenedor');
const data = require('../Controllers/contenedor');

/* Nueva Clase */
const Productos = new ContenedorProductos(data);

/* Mostrar todos los productos */

router.get('/productos', async (req, res) => {
  const respuesta = await Productos.getAll();
  res.render('data.ejs', { respuesta });
});

/* Agregar un producto */
router.post('/productos', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  if (isNaN(Number(price))) {
    res.status(400).json({ message: 'Precio debe ser un numero!' });
  } else {
    await Productos.addProduct(title, price, thumbnail);
    res.status(201).redirect('/productos');
  }
});

module.exports = router;
