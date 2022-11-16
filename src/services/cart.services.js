import { cartsModel } from '../models/index.js';

const createCart = async (emptyCart) => {
  try {
    const res = await cartsModel.add(emptyCart);
    return res;
  } catch (error) {
    throw error;
  }
};

const findById = async (id) => {
  try {
    const res = await cartsModel.getById(id);
    return res;
  } catch (error) {
    throw error;
  }
};

const update = async (id, value) => {
  try {
    const res = await cartsModel.update(id, value);
    return res;
  } catch (error) {
    throw error;
  }
};

export default { createCart, findById, update };
