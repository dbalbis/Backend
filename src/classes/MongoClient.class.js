import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import DBClient from './DBClient.class.js';
import config from '../config.js';

class MongoClient extends DBClient {
  constructor() {
    super();
    this.connected = false;
    this.client = mongoose;
  }

  async connect() {
    try {
      await this.client.connect(config.URLMONGO);

      this.connected = true;

      logger.info('DB conectada: Mongo');
    } catch (error) {
      logger.error('Error conectando a la base de datos');

      throw error;
    }
  }

  async discconect() {
    try {
      await this.client.connection.close();
      this.connected = false;
      logger.info('DB desconectada: Mongo');
    } catch (error) {
      logger.error('Error desconectando la base de datos');

      throw error;
    }
  }
}

export default MongoClient;
