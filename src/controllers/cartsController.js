import { productsModel, cartsModel, usersModel } from '../models/index.js';

const createCart = async (req, res) => {
  //Creamos un carrito con 0 productos.
  const data = await cartsModel.create({ productos: [] });
  if (data?.error)
    return res.status(data.error.status).json(data.error.message);

  //Editamos el valor currentCart del user que lo creo.
  const edit = await usersModel.updateOne(req.params._id, {
    cart: data._id,
  });
  console.log('id', data._id);
  if (edit?.error)
    return res.status(data.error.status).json(data.error.message);

  //Devolvemos al cliente el id de carrito creado.
  res.status(201).json({ idCart: data._id });
};

const addProduct = async (req, res) => {
  const idCart = req.params._id;
  const idProd = req.body.idProd;
  const product = await productsModel.getById(idProd);
  if (product?.error)
    return res.status(product.error.status).json(product.error.message);

  const cart = await cartsModel.getById(idCart);
  const productos = cart?.data?.productos;
  const prodInCart = productos?.find((prod) => prod.data._id == idProd);

  if (!prodInCart) {
    productos.push(product);
    const data = await cartsModel.updateOne(idCart, { productos });
    if (data?.error)
      return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
  } else {
    productos.map((prod) => {
      if (prod.data._id == idProd) return prodInCart;
      return prod;
    });
    const data = await cartsModel.updateOne(idCart, { productos });
    if (data?.error)
      return res.status(data.error.status).json(data.error.message);
    res.sendStatus(204);
  }
};

export default {
  createCart,
  addProduct,
};
