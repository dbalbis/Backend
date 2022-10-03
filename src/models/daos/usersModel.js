import { ContenedorMongo } from '../contenedores/contenedorMongo.js';

class UsersModel extends ContenedorMongo {
  constructor() {
    super('usersV3', {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      age: { type: Number, required: true },
      avatar: { type: String, required: true },
      phone: { type: Number, required: true },
      cart: { type: String, default: '' },
      hasproducts: { type: Boolean, default: false },
    });
  }
}

export default new UsersModel();
