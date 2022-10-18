import cartsService from '../services/carts.services.js';
import productsService from '../services/products.services.js';
import usersService from '../services/users.services.js';
import userDTO from '../classes/userDTO.js';
import logger from '../utils/logger.js';

const getAll = async (req, res) => {
  try {
    const data = await productsService.getAll();
    res.status(200).json({ data });
  } catch (error) {
    logger.error(`Se produjo un error al obtener los productos ${error}`);
  }
};

const postProduct = async (req, res) => {
  try {
    const product = req.body;
    const data = await productsService.postProduct(product);
    res.json({ data }).sendStatus(200);
    if (data?.error)
      return res.status(data.error.status).json(data.error.message);
    res.sendStatus(201);
  } catch (error) {
    logger.error(`Se produjo un error al agregar un producto ${error}`);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = req.params._id;
    const data = await productsService.deleteProduct(product);
    res.status(200).json({product})
    if (data?.error)
      return res.status(data.error.status).json(data.error.message);
    res.sendStatus(201);
  } catch (error) {
    logger.error(`Se produjo un error al eliminar el producto ${error}`);
  }
};

const updateProduct = async (req, res) => {
  try {
    const _id = req.params._id;
    const product = req.body;
    const data = await productsService.updateProduct(_id, product);

    res.status(200).json({ success: true, id: _id, result: product });

    if (data?.error)
      return res.status(data.error.status).json(data.error.message);
    res.sendStatus(201);
  } catch (error) {
    logger.error(`Se produjo un error al editar un producto ${error}`);
  }
};

export default {
  getAll,
  postProduct,
  deleteProduct,
  updateProduct,
};
