const { Router } = require('express');
const router = Router();

const ContenedorProductos = require('../contenedor/contenedor');

/* NUEVA CLASE */
const Cart = new ContenedorProductos('prodCart.json');
const Product = new ContenedorProductos('prodData.json');

/* Create Cart */

router.post('/', async (req, res) => {
  try {
    const cart = {
      timestamp: Date.now(),
      productos: [],
    };
    const newCart = await Cart.save(cart);
    id = newCart.id;
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
    const cart = await Cart.getById(cartId);
    const producto = await Product.getById(productId);

    await Cart.addCarrito(cart, producto, cartId);

    res.status(201).json({ message: 'Producto agregado!', cart });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Hubo un error' });
  }
});

/* Traer los productos de un carrito */
router.get('/:id/productos', async (req, res) => {
  try {
    const cartId = Number(req.params.id);
    const producto = await Cart.getAllProductsCart(cartId);
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

module.exports = router;
