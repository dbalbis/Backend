import { Router } from 'express';
const router = Router();

import { cartModel } from '../daos/index.js';
import { productsModel } from '../daos/index.js';

/* Create Cart */

router.post('/', async (req, res) => {
  try {
    const cart = {
      timestamp: Date.now(),
      productos: [],
    };
    const newCart = await cartModel.save(cart);
    let id = newCart.id;
    res
      .status(201)
      .json({ message: `Carrito creado! el id es ${id}`, newCart });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});
/* Agregar producto al carrito */
router.post('/:id/productos', async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const productId = Number(req.body.productId);
    /* FIREBASE */
    const cartIdFbase = req.params.id;
    const cartIdFirebase = req.params.id;
    const productIdFirebase = req.body.productId;
    const cart = await cartModel.getById(cartId, cartIdFirebase);
    const producto = await productsModel.getById(productId, productIdFirebase);

    const respuesta = await cartModel.addCarrito(
      cart,
      producto,
      cartId,
      cartIdFirebase,
      cartIdFbase
    );

    if (!respuesta) {
      res.status(404).json({ message: 'Not found!' });
    } else {
      res
        .status(201)
        .json({ message: 'Producto agregado al carrito!', producto });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* Traer los productos de un carrito */
router.get('/:id/productos', async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const cartIdFirebase = req.params.id;
    const producto = await cartModel.getAllProductsCart(cartId, cartIdFirebase);
    if (!producto) {
      res.status(404).json({ message: 'Not Found!' });
    } else {
      res.status(201).json({ message: 'Carrito encontrado!', producto });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* Vaciar Carrito y Eliminarlo */
router.delete('/:id', async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const cartIdFirebase = req.params.id;
    const producto = await cartModel.deleteCart(cartId, cartIdFirebase);
    if (!producto) {
      res.status(404).json({ message: 'Not Found!' });
    } else {
      res.status(201).json({ message: 'Carrito eliminado!' });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* Eliminar un producto del carrito */
router.delete('/:id/productos/:idProduct', async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const productId = Number(req.params.idProduct);
    /* FIREBASE */
    const cartIdFirebase = req.params.id;
    const productIdFirebase = req.params.id;

    const producto = await cartModel.deleteProductFromCart(
      cartId,
      productId,
      cartIdFirebase,
      productIdFirebase
    );

    if (producto) {
      res.status(201).json({ message: 'Producto eliminado!' });
    } else {
      res.status(404).json({ message: 'Not Found!' });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

export default router;
