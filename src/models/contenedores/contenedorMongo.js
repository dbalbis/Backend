import mongoose from 'mongoose';
import config from '../../config.js';

mongoose.connect(config.URLMONGO, (err, res) => {
  if (err) throw err;
  return console.log('Base de datos MONGO conectada.');
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
      console.log(`error agregando ${this.collection}: ${error}`);
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
      console.log('Error en', error);
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
}
