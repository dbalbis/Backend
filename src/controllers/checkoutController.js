import { productsModel, cartsModel, usersModel } from '../models/index.js';

const getCheckout = async (req, res) => {
  const username = req.user.username;
  const carts = await usersModel.getByUserName(username);
  if (carts?.error)
    return res.status(carts.error.status).json(carts.error.message);
  const idCart = carts.data.cart;
  /* En caso que el usuario no tenga ningun Producto */
  if (idCart === '') {
    const render = true;
    const data = {
      authUser: {
        user: req.user.username,
        img: req.user.avatar,
        mail: req.user.email,
      },
    };

    res.render('checkout', { data, products, render });
  } else {
    /* En caso de que si tenga productos agregados */
    const userCart = await cartsModel.getById(idCart);
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
};

export default {
  getCheckout,
};
