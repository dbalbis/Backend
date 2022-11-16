import { usersModel } from '../models/index.js';

const add = async (data) => {
  try {
    const res = await usersModel.add(data);
    return res;
  } catch (error) {
    throw error;
  }
};

const update = async (id, value) => {
  try {
    const res = await usersModel.update(id, value);
    return res;
  } catch (error) {
    throw error;
  }
};

const find = async (id) => {
  try {
    const res = await usersModel.find(id);
    return res;
  } catch (error) {
    throw error;
  }
};

export default {
  add,
  update,
  find,
};
