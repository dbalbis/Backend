import { productsModel } from '../models/index.js';



const getById = async (idProd) => {
  try {
    const product = await productsModel.getById(idProd)
    return product;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const products = await productsModel.getAll();
    return products;
  } catch (error) {
    throw error;
  }
};

const postProduct = async (product) => {
  try {
    const productCreated = await productsModel.create(product);
    return productCreated;
  } catch (error) {
    throw error;
  }
};

export default {
  getById,
  getAll,
  postProduct,
};
