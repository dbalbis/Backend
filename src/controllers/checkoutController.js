import cartService from '../services/cart.services.js';
import usersService from '../services/users.services.js';
import checkoutService from '../services/checkout.services.js';
import config from '../config.js';
import mailer from '../utils/mailer.js';

const postCheckout = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const cartId = req.user.cart;
      const userId = req.user.id;

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
            /* Creamos orden */
            try {
              await checkoutService.createOrder(req.user.email, cart.productos);
            } catch (error) {
              console.log('Error creando la orden', error);
            }

            /* Vaciamos el carrito */
            try {
              await cartService.update(cartId, { productos: [] });
            } catch (error) {
              console.log('Error vaciando el carrito', error);
            }

            /* Actualizamos el estado de carrito del user (cart: "") */
            try {
              await usersService.update(userId, { cart: '' });
            } catch (error) {
              console.log('Error actualizando el estado del carrito', error);
            }

            //Envío de mail al nuevo usuario.
            const mailOptions = {
              from: config.TEST_MAIL,
              to: config.TEST_MAIL,
              subject: `Nueva Orden de: ${req.user.firstname} | Entrega Final Backend | Diego Balbis`,
              html: `<h1 style="color: red;"> ¡NUEVO PEDIDO RECIBIDO! </h1>
    <h3 style="color: blue"> Datos del Usuario </h3>
    <p>Username: ${req.user.username}</p>
    <p>Email: ${req.user.email}</p>
    <p>Name: ${req.user.firstname}</p>
    <p>Last Name: ${req.user.lastname}</p>
    <p>Phone: ${req.user.phone}</p>
    <br>
    <h3 style="color: blue"> Datos del Pedido</h3>
    <ul>
    ${cart.productos
      .map((prod) => {
        return `<li>Nombre: ${prod.title} | Codigo: ${prod._id} | Precio unitario: ${prod.price} |</li>`;
      })
      .join('')}
  </ul>
  <p><strong>TOTAL DE LA ORDEN: $${cart.productos.reduce(
    (acc, act) => acc + act.price,
    0
  )}</p></strong>
    `,
            };

            try {
              await mailer.sendMail(mailOptions);
            } catch (error) {
              console.log('error con el envio de email', error);
            }

            res
              .status(200)
              .json({ message: 'Orden generada con exito y carrito vaciado!' });
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

const getOrder = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const orders = await checkoutService.getByEmail(req.user.email);
      if (orders) {
        res
          .status(200)
          .json({ message: `Las ordenes de ${req.user.email} son:`, orders });
      } else {
        res.status(404).json({
          message: `No existen ordenes para ${req.user.email}`,
        });
      }
    } else {
      res.status(401).json({
        message: `Para ver una orden debes estar logeado! POST /login`,
      });
    }
  } catch (error) {
    console.log('Hubo un error', error);
  }
};

export default {
  postCheckout,
  getOrder,
};
