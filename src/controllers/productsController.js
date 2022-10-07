import cartsService from '../services/carts.services.js';
import productsService from '../services/products.services.js';
import usersService from '../services/users.services.js';
import userDTO from '../classes/userDTO.js';
import logger from '../utils/logger.js';

const getAll = async (req, res) => {
  try {
    const username = req.user.username;
    const carts = await usersService.getByUserName(username);
    const userInfo = carts;
    if (carts?.error)
      return res.status(carts.error.status).json(carts.error.message);
    const idCart = carts.data.cart;

    if (idCart === '' || carts.data.hasproducts === false) {
      const render = true;
      const products = await productsService.getAll();
      if (products?.error)
        return res.status(products.error.status).json(products.error.message);
      /* Info de usuario desde el DTO */
      const data = new userDTO(userInfo);

      res.render('index', { data, products, render });
    } else {
      /* En caso de que si tenga productos agregados */
      const userCart = await cartsService.getById(idCart);
      const cartRender = userCart.data.productos;

      const products = await productsService.getAll();
      if (products?.error)
        return res.status(products.error.status).json(products.error.message);
      /* Info de usuario desde el DTO */
      const data = new userDTO(userInfo);

      res.render('index', { data, products, cartRender });
    }
  } catch (error) {
    logger.error(`Se produjo un error al obtener los productos ${error}`);
  }
};

const postProduct = async (req, res) => {
  try {
    const product = req.body;
    const data = await productsService.postProduct(product);
    if (data?.error)
      return res.status(data.error.status).json(data.error.message);
    res.sendStatus(201);
  } catch (error) {
    logger.error(`Se produjo un error al agregar un producto ${error}`);
  }
};

export default {
  postProduct,
  getAll,
};
