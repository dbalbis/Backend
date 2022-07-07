const { Router } = require('express');
const router = Router();

const ContenedorProductos = require('../contenedor/contenedor');

/* NUEVA CLASE */
const Products = new ContenedorProductos('prodData.json');

/* adminChecker */

function adminChecker(req, res, next) {
  const rol = req.body.rol;
  if (rol == 'admin') {
    next();
  } else {
    res.status(401).send('No tienes permisos para acceder!');
  }
}

/* GET TODOS LOS PRODUCTOS */

router.get('/', async (req, res) => {
  try {
    const respuesta = await Products.getAll();
    if (!respuesta) {
      res.status(404).json({ message: 'Todavia no hay productos!' });
    } else {
      res.status(200).send(respuesta);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* GET PRODUCTOS POR ID */
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const producto = await Products.getById(id);
    if (!producto) {
      res.status(404).json({ message: 'Not Found!' });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }

  const id = Number(req.params.id);
  const producto = await Products.getById(id);
  if (!producto) {
    res.status(404).json({ message: 'Not Found!' });
  } else {
    res.status(200).json(producto);
  }
});

/* POST PRODUCTOS */
router.post('/', adminChecker, async (req, res) => {
  try {
    const { title, desc, price, stock, thumbnail, codigo } = req.body;
    const producto = {
      title,
      codigo,
      desc,
      price,
      stock,
      thumbnail,
      timestamp: Date.now(),
    };

    if (isNaN(Number(price))) {
      res.status(400).json({ message: 'Precio debe ser un numero!' });
    } else {
      const nuevoProducto = await Products.save(producto);

      res.status(201).json({ message: 'Producto creado!', nuevoProducto });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* Editar un Producto */
router.put('/:id', adminChecker, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, desc, price, stock, thumbnail, codigo } = req.body;
    const prod = {
      id,
      title,
      desc,
      price,
      stock,
      thumbnail,
      codigo,
    };
    if (isNaN(Number(price))) {
      res.status(400).json({ message: 'Precio debe ser un numero!' });
    } else {
      const producto = await Products.editProduct(
        id,
        title,
        desc,
        price,
        stock,
        thumbnail,
        codigo
      );
      if (!producto) {
        res.status(404).json({ message: 'Not Found!' });
      } else {
        res.status(201).json({ message: 'Producto actualizado!', prod });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* Eliminar un Producto */
router.delete('/:id', adminChecker, async (req, res) => {
  const id = Number(req.params.id);
  const producto = await Products.deleteProduct(id);
  if (!producto) {
    res.status(404).json({ message: 'Not Found!' });
  } else {
    res.status(200).json({ meesage: 'Producto eliminado!' });
  }
});

/* Export Router */
module.exports = router;
