import productsService from '../services/products.services.js';
import logger from '../utils/logger.js';

const getAll = async (req, res) => {
  try {
    const data = await productsService.getAll();
    return data;
  } catch (error) {
    logger.error(`Se produjo un error al obtener los productos ${error}`);
  }
};

const postProduct = async ({ datos }) => {
  try {
    const data = await productsService.postProduct(datos);
    return data;
  } catch (error) {
    logger.error(`Se produjo un error al agregar un producto ${error}`);
  }
};

const updateProduct = async ({ id, datos }) => {
  try {
    await productsService.updateProduct(id, datos);
    const updatedProduct = await productsService.getById(id);
    return updatedProduct;
  } catch (error) {
    logger.error(`Se produjo un error al editar un producto ${error}`);
  }
};

const deleteProduct = async ({ id }) => {
  try {
    await productsService.deleteProduct(id);
    return `product ${id} eliminado exitosamente`;
  } catch (error) {
    logger.error(`Se produjo un error al eliminar el producto ${error}`);
  }
};

export default {
  getAll,
  postProduct,
  updateProduct,
  deleteProduct,
};
