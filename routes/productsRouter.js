import { Router } from 'express';
const router = Router();

import { productsModel } from '../daos/index.js';

import adminChecker from '../middlewares/adminChecker.js';

/* GET TODOS LOS PRODUCTOS */

router.get('/', async (req, res) => {
  try {
    const respuesta = await productsModel.getAll();
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
    const idFirebase = req.params.id;
    const producto = await productsModel.getById(id, idFirebase);
    if (!producto) {
      res.status(404).json({ message: 'Not Found!' });
    } else {
      res.status(200).json(producto);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* POST PRODUCTOS */
router.post('/', adminChecker, async (req, res) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
      timestamp: Date.now(),
    };

    const nuevoProducto = await productsModel.save(producto);

    res.status(201).json({ message: 'Producto creado!', nuevoProducto });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* Editar un Producto */
router.put('/:id', adminChecker, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const idFirebase = req.params.id;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const prod = {
      id,
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    };
    if (isNaN(Number(precio))) {
      res.status(400).json({ message: 'Precio debe ser un numero!' });
    } else {
      const producto = await productsModel.editProduct(
        id,
        idFirebase,
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock
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
  const idFirebase = req.params.id;
  const producto = await productsModel.deleteProduct(id, idFirebase);
  if (!producto) {
    res.status(404).json({ message: 'Not Found!' });
  } else {
    res.status(200).json({ meesage: 'Producto eliminado!' });
  }
});

/* Export Router */
export default router;
