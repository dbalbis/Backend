import { ContenedorMongo } from '../contenedores/ContenedorMongo.js';

class ProductsModel extends ContenedorMongo {
  constructor() {
    super('productv3', {
      timestamp: { type: Number, require: true },
      title: { type: String, require: true },
      desc: String,
      code: String,
      photo: String,
      price: { type: Number, require: true },
      stock: { type: Number, require: true },
    });
  }
}

export default new ProductsModel();
