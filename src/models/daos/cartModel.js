import { contenedorMongo } from '../contenedores/contenedor.js';

class UsersModel extends contenedorMongo {
  constructor() {
    super('cartsFINAL', {
      timestamp: { type: Number, require: true },
      productos: { type: Array, require: true },
    });
  }
}

export default new UsersModel();
