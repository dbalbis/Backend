import { contenedorMongo } from '../contenedores/contenedor.js';

class MessagesModel extends contenedorMongo {
  constructor() {
    super('chatFINAL', {
      email: { type: String, required: true },
      message: { type: String, required: true },
      timestamp: { type: String, required: true, unique: true },
    });
  }
}

export default new MessagesModel();
