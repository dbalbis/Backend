import { ContenedorMongo } from '../contenedores/ContenedorMongo.js';

class CartModel extends ContenedorMongo {
  constructor() {
    super('cartv3', {
      timestamp: { type: Number, required: true },
      productos: { type: Array, required: true },
    });
  }
}

export default new CartModel();
