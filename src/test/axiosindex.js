import axios from 'axios';

/* Leemos los productos */
const getAllProducts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/productos');
    console.log(response.data.data);
  } catch (error) {
    console.log('Hubo un error', error);
  }
};

const postProduct = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/productos', {
      title: 'Buzo de obrero',
      desc: 'Un Canguro',
      code: '43xd',
      price: 3000,
      stock: 5,
      photo: '/uploads/canguro.jpg',
    });
    console.log('Producto Agregado!', response.data.data);
  } catch (error) {
    console.log('Hubo un error', error);
  }
};

const updateProduct = async (_id) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/productos/${_id}`,
      {
        title: 'Este es articulo el item Editado',
        desc: 'Editado',
        code: '43xd',
        price: 3000,
        stock: 5,
        photo: '/uploads/canguro.jpg',
      }
    );
    console.log('Producto editado!', response.data);
  } catch (error) {
    console.log('Hubo un error', error);
  }
};

const deleteProduct = async (_id) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/productos/${_id}`
    );
    console.log('Producto Eliminado!', response.data);
  } catch (error) {
    console.log('Hubo un error', error);
  }
};

export default {
  getAllProducts,
  postProduct,
  updateProduct,
  deleteProduct,
};
