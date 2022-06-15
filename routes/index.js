const { Router } = require('express');
const router = Router();

/* Productos default */

let data = [
  {
    title: 'Producto 1',
    price: 750,
    thumbnail: 'google.com/1',
    id: 1,
  },

  {
    title: 'Producto 2',
    price: 950,
    thumbnail: 'google.com/2',
    id: 2,
  },

  {
    title: 'Producto 3',
    price: 1050,
    thumbnail: 'google.com/3',
    id: 3,
  },
];

/* Creando la clase */

class contenedorProductos {
  constructor(data) {
    this.data = data;
  }

  /* Traer todos */

  async getAll() {
    try {
      return data;
    } catch (error) {
      console.log('Error en', error);
    }
  }
  /* Traer por ID */
  getById(id) {
    try {
      if (data.some((data) => data['id'] === id)) {
        const elemento = data.find((elemento) => {
          return elemento.id === id;
        });
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error en', error);
    }
  }

  /* Agregar Producto - POST */
  addProduct(title, price, thumbnail) {
    try {
      let id = data.length + 1;
      data.push({ title, price, thumbnail, id });
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }
  /* Editar Producto */
  editProduct(id, title, price, thumbnail) {
    try {
      if (data.some((data) => data['id'] === id)) {
        const newArray = data.filter((data) => data.id !== id);
        let product = {
          title,
          price: Number(price),
          thumbnail,
          id,
        };
        data = [...newArray, product];
        return newArray;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }
  /* Eliminar Producto */
  deleteProduct(id) {
    try {
      if (data.some((data) => data['id'] === id)) {
        const newArray = data.filter((data) => data.id !== id);
        data = [...newArray];
        return newArray;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }
}

/* Nueva Clase */
const Productos = new contenedorProductos(data);

/* Mostrar todos los productos */

router.get('/api/productos', async (req, res) => {
  const respuesta = await Productos.getAll();
  res.status(200).send(respuesta);
});

/* Agregar un producto */
router.post('/api/productos', async (req, res) => {
  const { title, price, thumbnail } = req.body;
  if (isNaN(Number(price))) {
    res.status(400).json({ message: 'Precio debe ser un numero!' });
  } else {
    await Productos.addProduct(title, price, thumbnail);
    res.status(201).json({ message: 'Created!' });
  }
});

/* Mostrar un producto por ID */
router.get('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = Productos.getById(id);
  if (!producto) {
    res.status(404).json({ message: 'Not Found!' });
  } else {
    res.status(200).json(producto);
  }
});

/* Editar un Producto */
router.put('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, price, thumbnail } = req.body;
  const producto = Productos.editProduct(id, title, price, thumbnail);
  if (!producto) {
    res.status(404).json({ message: 'Not Found!' });
  } else {
    res.status(200).json({ meesage: 'Producto actualizado!' });
  }
});

/* Eliminar un Producto */
router.delete('/api/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const producto = Productos.deleteProduct(id);
  if (!producto) {
    res.status(404).json({ message: 'Not Found!' });
  } else {
    res.status(200).json({ meesage: 'Producto eliminado!' });
  }
});

module.exports = router;
