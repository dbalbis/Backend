const logger = require('../logs/logger');

class messagesManager {
  constructor(configSqlDB, tableName) {
    try {
      this.dbSqldb = configSqlDB;
      this.tableName = tableName;
      configSqlDB.schema.hasTable(tableName).then(function (exists) {
        if (!exists) {
          return configSqlDB.schema.createTable(tableName, (table) => {
            table.increments('id').primary();
            table.string('email', 50);
            table.string('date');
            table.string('message');
          });
        }
      });
    } catch (err) {
      logger.error('error constructor', err);
    }
  }

  async getAllMessages() {
    let rows = await this.dbSqldb.from(this.tableName).select('*');
    rows.forEach((article) => {});
    return rows;
  }

  async newMessages(email, date, message) {
    const elemento = {
      email,
      date,
      message,
    };
    const messages = await this.dbSqldb.from(this.tableName).insert(elemento);
    return messages;
  }
}

module.exports = messagesManager;
