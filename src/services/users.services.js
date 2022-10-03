import { usersModel } from '../models/index.js';

const getUser = async (username) => {
  try {
    const user = await usersModel.getUser(username);
    return user;
  } catch (error) {
    throw error;
  }
};

const getByCartId = async (idCart) => {
  try {
    const findedCart = await usersModel.getByCartId(idCart);
    return findedCart;
  } catch (error) {
    throw error;
  }
};



const updateOne = async (userId, value) => {
  try {
    const updatedUser = await usersModel.updateOne(userId, value);
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const getByUserName = async (username) => {
  try {
    const user = await usersModel.getByUserName(username);
    return user;
  } catch (error) {
    throw error;
  }
};

const postRegister = async (user) => {
  try {
    const newUser = await usersModel.create(user);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export default {
  getUser,
  getByCartId,
  getByUserName,
  postRegister,
  updateOne,
};
