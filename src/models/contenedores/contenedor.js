import mongoose from 'mongoose';
import config from '../../config.js';
import logger from "../../utils/logger.js"

mongoose.connect(config.URLMONGO, (err, res) => {
  if (err) throw err;
  return logger.info('Base de datos MONGO conectada.');
});

export class contenedorMongo {
  constructor(collectionName, schema) {
    this.collection = collectionName;
    this.model = mongoose.model(collectionName, mongoose.Schema(schema));
  }
  /* Generales */

  async find() {
    try {
      const res = await this.model.find();
      return res;
    } catch (error) {
      logger.error(`error buscando ${this.collection}: ${error}`);
    }
  }

  async add(data) {
    try {
      data.timestamp = Date.now();
      const res = await this.model.create(data);
      return res;
    } catch (error) {
      logger.error(`error agregando ${this.collection}: ${error}`);
    }
  }

  async update(id, NewDataObj) {
    try {
      const res = await this.model.updateOne({ _id: id }, { $set: NewDataObj });
      return res;
    } catch (error) {
      logger.error(`error modificando ${this.collection}: ${error}`);
    }
  }

  async deleteItem(id) {
    try {
      const res = await this.model.deleteOne({ _id: id });
      return res;
    } catch (error) {
      logger.error(`error eliminando ${this.collection}: ${error}`);
    }
  }

  async getById(id) {
    try {
      const elemento = await this.model.findById(id);
      if (elemento) {
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      logger.error('Error buscando los mensajes', error);
    }
  }

  /* Solo para Users */

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
      logger.error('Error obteniendo el usuario', error);
    }
  }

  /* Solo para Mensajes */

  async getByEmail(email) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['email'] === email)) {
        const elemento = this.model.find({ email: `${email}` });
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      logger.error('Error buscando los mensajes', error);
    }
  }

  async addMessage(email, message) {
    try {
      var today = new Date();
      const newMessage = {
        email,
        message,
      };
      newMessage.timestamp = today.toLocaleString('es-ES');
      const res = await this.model.create(newMessage);
      return res;
    } catch (error) {
      logger.error(`error agregando ${this.collection}: ${error}`);
    }
  }

  /* Productos */

  async getByCategory(category) {
    try {
      const data = await this.model.find();
      if (data.some((data) => data['category'] === category)) {
        const elemento = this.model.find({ category: `${category}` });
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      logger.error('Error buscando los productos de la categoria', error);
    }
  }
}
