import { checkoutModel } from '../models/index.js';

const createOrder = async (email, productos) => {
  try {
    const res = await checkoutModel.add({ email, productos });
    return res;
  } catch (error) {
    throw error;
  }
};

const getByEmail = async (email) => {
  try {
    const res = await checkoutModel.getByEmail(email);
    return res;
  } catch (error) {
    throw error;
  }
};
export default { createOrder, getByEmail };
