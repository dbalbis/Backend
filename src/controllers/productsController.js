import productServices from '../services/product.services.js';

const getAllProducts = async (req, res) => {
  try {
    const products = await productServices.find();
    if (products) {
      res.status(200).json(products);
    } else {
      res
        .status(400)
        .json({ message: 'Todavia no tenemos productos! Carga alguno.' });
    }
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productServices.getById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(400).json({
        message: `No existe ningun producto con el id: ${id}!`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const data = await productServices.getByCategory(category);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(200).json({
        message: `La categoria ${category} no existe, o aun no tiene productos!`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;

    const data = await productServices.add(newProduct);
    if (!data) {
      res.status(400).json({ message: 'Error al agregar el producto!' });
    } else {
      res.status(200).json({ message: 'Producto agregado con exito!', data });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const NewDataObj = req.body;
    const data = await productServices.update(id, NewDataObj);
    if (!data) {
      res.status(400).json({
        message: 'Error al editar el producto! (Compruebe que el id exista)',
      });
    } else {
      res.status(200).json({ message: 'Producto editado con exito!', data });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productServices.deleteItem(id);
    if (!data) {
      res.status(400).json({
        message: 'Error al eliminar el producto! (Compruebe que el id exista)',
      });
    } else {
      res.status(200).json({ message: 'Producto eliminado con exito!', data });
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getByCategory,
  getById,
};
