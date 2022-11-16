import cartService from '../services/cart.services.js';
import checkoutService from '../services/checkout.services.js';

const postCheckout = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const cartId = req.user.cart;

      if (cartId === '') {
        res.status(401).json({
          message: `El usuario no tiene un carrito creado, crea uno! POST /carrito`,
        });
      } else {
        const cart = await cartService.findById(cartId);
        if (cart.productos.length === 0) {
          res.status(400).json({
            message:
              'Tu carrito esta vacio! Carga algun producto. POST /carrito/productos',
          });
        } else {
          if (cart) {
            const newOrder = await checkoutService.createOrder(
              cart,
              req.user.email
            );
            console.log(newOrder);
          } else {
            res
              .status(400)
              .json({ message: 'Hubo un error cargando tu carrito.' });
          }
        }
      }
    } else {
      res.status(401).json({
        message: `Para crear una orden debes estar logeado! POST /login`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  postCheckout,
};
