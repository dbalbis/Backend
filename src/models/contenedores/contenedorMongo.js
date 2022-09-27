import mongoose from 'mongoose';
import config from '../../config.js';
import logger from '../../utils/logger.js';

mongoose.connect(config.URLMONGO, (err, res) => {
  if (err) throw err;
  return logger.info('Base de datos MONGO conectada.');
});

export class ContenedorMongo {
  constructor(collectionName, schema) {
    this.collection = collectionName;
    this.model = mongoose.model(collectionName, mongoose.Schema(schema));
  }

  async create(data) {
    try {
      data.timestamp = Date.now();
      const res = await this.model.create(data);
      return res;
    } catch (error) {
      logger.error(`error agregando ${this.collection}: ${error}`);
    }
  }

  async getUser(username) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['username'] === username)) {
        const elemento = this.model.findOne({ username: `${username}` });
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      logger.error('Error en', error);
    }
  }

  async getByCartId(cartId) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['cart'] === cartId)) {
        const elemento = this.model.findOne({ cart: `${cartId}` });
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      logger.error('Error en', error);
    }
  }

  async getAll() {
    try {
      const data = await this.model.find().lean();
      return { data };
    } catch (error) {
      logger.warn(`error in getting ${this.collection}: ${error}`);
      return {
        error: { message: `error in getting ${this.collection}`, status: 500 },
      };
    }
  }

  async updateOne(id, NewDataObj) {
    try {
      await this.model.updateOne({ _id: id }, { $set: NewDataObj });
    } catch (error) {
      logger.error(`error in updating ${this.collection}: ${error}`);
      return {
        error: { message: `error in updating ${this.collection}`, status: 500 },
      };
    }
  }

  async getById(id) {
    try {
      const data = await this.model.findOne({ _id: id });
      if (data) return { data };
      return {
        error: { message: `no ${this.collection} with ID: ${id}`, status: 404 },
      };
    } catch (error) {
      logger.error(`error in getting ${this.collection}: ${error}`);
      return {
        error: { message: `error in getting ${this.collection}`, status: 500 },
      };
    }
  }
  async getByUserName(username) {
    try {
      const data = await this.model.findOne({ username: username });
      if (data) return { data };
      return {
        error: {
          message: `no ${this.collection} with ID: ${username}`,
          status: 404,
        },
      };
    } catch (error) {
      logger.error(`error in getting ${this.collection}: ${error}`);
      return {
        error: { message: `error in getting ${this.collection}`, status: 500 },
      };
    }
  }

  async updateOne(id, NewDataObj) {
    try {
      await this.model.updateOne({ _id: id }, { $set: NewDataObj });
    } catch (error) {
      logger.error(`error in updating ${this.collection}: ${error}`);
      return {
        error: { message: `error in updating ${this.collection}`, status: 500 },
      };
    }
  }

  async deleteById(id) {
    try {
      await this.model.deleteOne({ _id: id });
    } catch (error) {
      logger.error(`error eliminando ${this.collection}: ${error}`);
      return {
        error: { message: `error eliminando${this.collection}`, status: 500 },
      };
    }
  }
}
