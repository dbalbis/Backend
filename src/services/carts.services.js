import { cartsModel } from '../models/index.js';

const updateOne = async (idCart, value) => {
  try {
    const newProduct = await cartsModel.updateOne(idCart, value);
    return newProduct;
  } catch (error) {
    throw error;
  }
};

const create = async (emptyCart) => {
  try {
    const newCart = await cartsModel.create(emptyCart);
    return newCart;
  } catch (error) {
    throw error;
  }
};

const getById = async (idCart) => {
  try {
    const cartFinded = await cartsModel.getById(idCart);
    return cartFinded;
  } catch (error) {
    throw error;
  }
};

const deleteById = async (idCart) => {
  try {
    const cartDeleted = cartsModel.deleteById(idCart);
    return cartDeleted;
  } catch (error) {
    throw error;
  }
};

export default {
  updateOne,
  create,
  getById,
  deleteById,
};
