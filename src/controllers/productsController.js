import { productsModel, cartsModel, usersModel } from '../models/index.js';

const getAll = async (req, res) => {
  const username = req.user.username;
  const carts = await usersModel.getByUserName(username);
  if (carts?.error)
    return res.status(carts.error.status).json(carts.error.message);
  const idCart = carts.data.cart;
  /* En caso que el usuario no tenga ningun Producto */
  if (idCart === '') {
    const render = true;
    const products = await productsModel.getAll();
    if (products?.error)
      return res.status(products.error.status).json(products.error.message);
    const data = {
      authUser: {
        user: req.user.username,
        img: req.user.avatar,
        mail: req.user.email,
      },
    };

    res.render('index', { data, products, render });
  } else {
  /* En caso de que si tenga productos agregados */
    const userCart = await cartsModel.getById(idCart);
    const cartRender = userCart.data.productos;

    const products = await productsModel.getAll();
    if (products?.error)
      return res.status(products.error.status).json(products.error.message);
    const data = {
      authUser: {
        user: req.user.username,
        img: req.user.avatar,
        mail: req.user.email,
      },
    };

    res.render('index', { data, products, cartRender });
  }
};

const postProduct = async (req, res) => {
  const product = req.body;
  const data = await productsModel.create(product);
  if (data?.error)
    return res.status(data.error.status).json(data.error.message);
  res.sendStatus(201);
};

export default {
  postProduct,
  getAll,
};
