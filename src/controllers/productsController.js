import { productsModel } from '../models/index.js';

const getAll = async (req, res) => {
  const products = await productsModel.getAll();
  if (products?.error)
    return res.status(products.error.status).json(products.error.message);
  const data = {
    authUser: {
      user: req.user.username,
      img: req.user.avatar,
      mail: req.user.email,
    },
  };

  res.render('index', { data, products });
};

const postProduct = async (req, res) => {
  const product = req.body;
  const data = await productsModel.create(product);
  if (data?.error)
    return res.status(data.error.status).json(data.error.message);
  res.sendStatus(201);
};

export default {
  postProduct,
  getAll,
};
