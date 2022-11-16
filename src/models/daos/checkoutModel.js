import { contenedorMongo } from '../contenedores/contenedor.js';

class CheckoutModel extends contenedorMongo {
  constructor() {
    super('ordersFINAL', {
      email: { type: String, require: true },
      timestamp: { type: Number, require: true },
      productos: { type: Array, require: true },
      state: { type: String, default: 'generada' },
    });
  }
}

export default new CheckoutModel();
