import { ContenedorMongo } from '../contenedores/ContenedorMongo.js';

class ProductsModel extends ContenedorMongo {
  constructor() {
    super('productv3', {
      timestamp: { type: Number, required: true },
      title: { type: String, required: true },
      desc: String,
      code: String,
      photo: String,
      price: { type: Number, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default new ProductsModel();
