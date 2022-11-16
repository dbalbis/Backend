import { productsModel } from '../models/index.js';

const find = async () => {
  try {
    const res = await productsModel.find();
    return res;
  } catch (error) {
    throw error;
  }
};

const add = async (data) => {
  try {
    const res = await productsModel.add(data);
    return res;
  } catch (error) {
    throw error;
  }
};

const update = async (id, NewDataObj) => {
  try {
    const res = await productsModel.update(id, NewDataObj);
    return res;
  } catch (error) {
    throw error;
  }
};

const deleteItem = async (id) => {
  try {
    const res = await productsModel.deleteItem(id);
    return res;
  } catch (error) {
    throw error;
  }
};

const getByCategory = async (category) => {
  try {
    const res = await productsModel.getByCategory(category);
    return res;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const res = await productsModel.getById(id);
    return res;
  } catch (error) {
    throw error;
  }
};



export default {
  find,
  add,
  update,
  deleteItem,
  getByCategory,
  getById,
};
