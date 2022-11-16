import { contenedorMongo } from '../contenedores/contenedor.js';

class UsersModel extends contenedorMongo {
  constructor() {
    super('usersFINAL', {
      timestamp: { type: String, required: true, unique: true },
      username: { type: String, required: true, unique: true },
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      phone: { type: Number, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      cart: { type: String, default: '' },
    });
  }
}

export default new UsersModel();
