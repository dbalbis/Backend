import productsService from '../services/products.services.js';
import cartsService from '../services/carts.services.js';
import usersService from '../services/users.services.js';
import logger from '../utils/logger.js';

const createCart = async (req, res) => {
  try {
    //Creamos un carrito con 0 productos.
    const data = await cartsService.create({ productos: [] });
    if (data?.error)
      return res.status(data.error.status).json(data.error.message);

    //Editamos el valor currentCart del user que lo creo.
    const edit = await usersService.updateOne(req.params._id, {
      cart: data._id,
    });
    if (edit?.error)
      return res.status(data.error.status).json(data.error.message);

    //Devolvemos al cliente el id de carrito creado.
    res.status(201).json({ idCart: data._id });
  } catch (error) {
    logger.error(`Se produjo un error al crear el carrito ${error}`);
  }
};

const addProduct = async (req, res) => {
  try {
    const idCart = req.params._id;
    const idProd = req.body.idProd;
    const getByCart = await usersService.getByCartId(idCart);
    const product = await productsService.getById(idProd);
    if (product?.error)
      return res.status(product.error.status).json(product.error.message);
   

    const cart = await cartsService.getById(idCart);
    const productos = cart?.data?.productos;
    const prodInCart = productos?.find((prod) => prod.data._id == idProd);

    if (!prodInCart) {
      productos.push(product);
      const data = await cartsService.updateOne(idCart, { productos });
      await usersService.updateOne(getByCart._id, {
        hasproducts: true,
      });
      if (data?.error)
        return res.status(data.error.status).json(data.error.message);
      res.sendStatus(204);
    } else {
      productos.map((prod) => {
        if (prod.data._id == idProd) return prodInCart;
        return prod;
      });
      const data = await cartsService.updateOne(idCart, { productos });
      if (data?.error)
        return res.status(data.error.status).json(data.error.message);
      res.sendStatus(204);
    }
  } catch (error) {
    logger.error(`Se produjo un error al agregar el producto ${error}`);
  }
};

export default {
  createCart,
  addProduct,
};
