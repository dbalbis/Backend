import logger from '../utils/logger.js';

class DBClient {
  async connect() {
    throw new logger.error('Metodo de conexion no implementado!');
  }

  async discconect() {
    throw new logger.error('Metodo de desconexion no implementado!');
  }
}

export default DBClient;
