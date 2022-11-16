const createOrder = async (cart, email) => {
  try {
    console.log(cart, email);
    /*     const res = await productsModel.add(data);
    return res; */
  } catch (error) {
    throw error;
  }
};
export default { createOrder };
