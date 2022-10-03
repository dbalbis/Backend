import cartsService from '../services/carts.services.js';
import usersService from '../services/users.services.js';
import mailer from '../utils/mailer.js';
import twilioClient from '../utils/twilio.js';
import config from '../config.js';
import { fileURLToPath } from 'url';
import path from 'path';
import logger from '../utils/logger.js';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const getCheckout = async (req, res) => {
  try {
    const username = req.user.username;
    const carts = await usersService.getByUserName(username);
    if (carts?.error)
      return res.status(carts.error.status).json(carts.error.message);
    const idCart = carts.data.cart;
    const userCart = await cartsService.getById(idCart);

    /* En caso que el usuario no tenga ningun Producto */
    if (idCart === '' || carts.data.hasproducts === false) {
      const render = true;
      const data = {
        authUser: {
          user: req.user.username,
          img: req.user.avatar,
          mail: req.user.email,
        },
      };

      res.render('checkout', { data, render });
    } else {
      /* En caso de que si tenga productos agregados */
      const cartRender = userCart.data.productos;

      const data = {
        authUser: {
          user: req.user.username,
          img: req.user.avatar,
          mail: req.user.email,
        },
      };
      /* Precio total */
      let total = 0;

      cartRender.forEach((producto) => {
        total += producto.data.price;
      });

      res.render('checkout', { data, cartRender, total });
    }
  } catch (error) {
    logger.error(`Se produjo un error al traer el carrito ${error}`);
  }
};

const postCheckout = async (req, res) => {
  try {
    const username = req.user.username;
    const carts = await usersService.getByUserName(username);
    const idCart = carts.data.cart;
    const userCart = await cartsService.getById(idCart);
    const cartRender = userCart.data.productos;

    //Envío de mail al nuevo usuario.
    const mailOptions = {
      from: 'Tercera entrega | Diego Balbis',
      to: config.TEST_MAIL,
      subject: `Nuevo pedido de: ${req.user.username}`,
      html: `<h1 style="color: red;"> ¡NUEVO PEDIDO RECIBIDO! </h1>
    <h3 style="color: blue"> Datos del USUARIO </h3>
    <p>Email: ${req.user.email}</p>
    <p>Name: ${req.user.name}</p>
    <p>Address: ${req.user.address}</p>
    <p>Age: ${req.user.age}</p>
    <p>Tel: ${req.user.phone}</p>
    <br>
    <h3 style="color: blue"> Datos del Pedido</h3>
    <ul>
    ${cartRender
      .map((prod) => {
        return `<li>Nombre: ${prod.data.title} | Codigo: ${prod.data.code} | Precio unitario: ${prod.data.price} |</li>`;
      })
      .join('')}
  </ul>
  <p><strong>TOTAL DE LA ORDEN: $${cartRender.reduce(
    (acc, act) => acc + act.data.price,
    0
  )}</p></strong>
    `,
    };

    /* Envio de mensaje de Whatsapp al admin */
    const wspOptions = {
      body: `¡NUEVO PEDIDO RECIBIDO!
    *Datos del USUARIO*
    Email: ${req.user.email}
    Name: ${req.user.name}
    Address: ${req.user.address}
    Age: ${req.user.age}
    Tel: ${req.user.phone}
    
    *Datos del Pedido*
    
    ${cartRender
      .map((prod) => {
        return `
        Nombre: ${prod.data.title}
        Codigo: ${prod.data.code}
        Precio unitario: ${prod.data.price}`;
      })
      .join('\n')}
  
  *TOTAL DE LA ORDEN: $${cartRender.reduce(
    (acc, act) => acc + act.data.price,
    0
  )}*
    `,
      from: `whatsapp:${config.twilioWhatsappFrom}`,
      to: `whatsapp:${config.twilioWhatsappTo}`,
    };

    //Envio de SMS al cliente
    const smsOptions = {
      body: `Hola, ${req.user.name}. Su pedido #${idCart} ha sido recibido y se encuentra en proceso.`,
      from: config.twilioSMSFrom,
      to: config.twilioSMSTo, //`{req.user.phone} Acordarse de registrarlo sin el primer 0`
    };

    try {
      await mailer.sendMail(mailOptions);
      await twilioClient.messages.create(wspOptions);
      await twilioClient.messages.create(smsOptions);
    } catch (error) {
      logger.error(error);
    }

    await cartsService.deleteById(idCart);
    await usersService.updateOne(req.user._id, { cart: '' });
    await usersService.updateOne(req.user._id, { hasproducts: false });

    res.send(
      `<script type="text/javascript"> alert("Orden recibida! El pedido llegara mañana."); window.location.href = "/login"; </script>`
    );
  } catch (error) {
    logger.error(`Se produjo un error al finalizar la compra ${error}`);
  }
};

export default {
  getCheckout,
  postCheckout,
};
