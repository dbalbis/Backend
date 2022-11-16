import { contenedorMongo } from '../contenedores/contenedor.js';

class UsersModel extends contenedorMongo {
  constructor() {
    super('productsFINAL', {
      timestamp: { type: Number, required: true },
      title: { type: String, required: true },
      photo: String,
      price: { type: Number, required: true },
      desc: String,
      category: { type: String, required: true },
    });
  }
}

export default new UsersModel();
