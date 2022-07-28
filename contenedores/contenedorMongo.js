import mongoose from 'mongoose';
import config from '../config.js';

mongoose.connect(config.mongodb.connectionString, (err, res) => {
  if (err) throw err;

  console.log('Base de datos mongo conectada.');
});

class ContenedorMongo {
  constructor(collectionName, schema) {
    this.collection = collectionName;
    this.model = mongoose.model(collectionName, mongoose.Schema(schema));
  }

  /* Agregar Objeto */

  async save(objeto) {
    /* Obteniendo datos del archivo */
    const data = await this.model.find();
    /* Si esta vacio el id sera 1 y se guarda como arreglo */

    if (data.length === 0) {
      objeto.id = 1;
      await this.model.create([objeto]);
      console.log('Elemento creado!');
      return objeto;
    } else {
      /* De lo contrario el id va a ser igual al ultimo id +1 */
    }

    objeto.id = data.length + 1;
    await this.model.create([objeto]);
    console.log('Productos Creados!');
    return objeto;
  }

  /* TRAER TODOS */
  async getAll() {
    try {
      const data = await this.model.find();

      if (data.length === 0) {
        return null;
      } else {
        return data;
      }
    } catch (error) {
      console.log('Error en', error);
    }
  }

  /* Traer por ID */
  async getById(id) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['id'] === id)) {
        const elemento = this.model.findOne({ id: `${id}` });
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error en', error);
    }
  }

  /* Editar Producto - PUT */
  async editProduct(id, nombre, descripcion, codigo, foto, precio, stock) {
    try {
      let data = await this.model.find();
      if (data.some((data) => data['id'] === id)) {
        const product = this.model.updateOne(
          { id: `${id}` },
          {
            $set: {
              nombre: `${nombre}`,
              descripcion: `${descripcion}`,
              codigo: `${codigo}`,
              foto: `${foto}`,
              precio: `${precio}`,
              stock: `${stock}`,
            },
          }
        );
        return product;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Eliminar Producto */
  async deleteProduct(id) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['id'] === id)) {
        const product = this.model.deleteOne({ id: `${id}` });
        return product;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Agregar producto al carrito */
  async addCarrito(cart, producto, cartId) {
    try {
      if (!producto || !cart) {
        return null;
      } else {
        const newProduct = this.model.updateOne(
          { id: `${cartId}` },
          { $push: { productos: producto } }
        );

        return newProduct;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Traer todos los productos de un carrito */

  async getAllProductsCart(id) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['id'] === id)) {
        const elemento = this.model.findOne({ id: `${id}` });

        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Vaciar carrito y eliminarlo */
  async deleteCart(cartId) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['id'] === cartId)) {
        const product = this.model.deleteMany({ id: `${cartId}` });

        return product;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Eliminar un producto por su id de carrito */
  async deleteProductFromCart(cartId, productoId) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['id'] === cartId && productoId)) {
        const delProduct = this.model.updateOne(
          { id: `${cartId}` },
          { $pull: { productos: { id: productoId } } }
        );
        return delProduct;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }
}

export default ContenedorMongo;
