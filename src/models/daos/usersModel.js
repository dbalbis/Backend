import { ContenedorMongo } from '../contenedores/contenedorMongo.js';

class UsersModel extends ContenedorMongo {
  constructor() {
    super('usersV3', {
      username: { type: String, require: true, unique: true },
      email: { type: String, require: true, unique: true },
      password: { type: String, require: true },
      name: { type: String, require: true },
      address: { type: String, require: true },
      age: { type: Number, require: true },
      avatar: { type: String, require: true },
      phone: { type: Number, require: true },
      cart: { type: String, default: '' },
      hasproducts: { type: Boolean, default: false },
    });
  }
}

export default new UsersModel();
