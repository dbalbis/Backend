import { messagesModel } from '../models/index.js';

const find = async () => {
  try {
    const res = await messagesModel.find();
    return res;
  } catch (error) {
    throw error;
  }
};

const getByEmail = async (email) => {
  try {
    const res = await messagesModel.getByEmail(email);
    return res;
  } catch (error) {
    throw error;
  }
};

const addMessage = async (email, message) => {
  try {
    const res = await messagesModel.addMessage(email, message);
    return res;
  } catch (error) {
    throw error;
  }
};

export default {
  find,
  addMessage,
  getByEmail,
};
