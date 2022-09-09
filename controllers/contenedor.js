class productsManager {
  constructor(configMariaDB, tableName) {
    try {
      this.dbMariadb = configMariaDB;
      this.tableName = tableName;
      configMariaDB.schema.hasTable(tableName).then(function (exists) {
        if (!exists) {
          return configMariaDB.schema.createTable(tableName, (table) => {
            table.increments('id').primary();
            table.string('title', 50);
            table.float('price');
            table.string('thumbnail');
          });
        }
      });
    } catch (err) {
      logger.error('error constructor', err);
    }
  }
  async getAll() {
    let rows = await this.dbMariadb.from(this.tableName).select('*');

    return rows;
  }

  async newProduct(title, price, thumbnail) {
    const elemento = {
      title,
      price,
      thumbnail,
    };
    const product = await this.dbMariadb.from(this.tableName).insert(elemento);
    return product;
  }
}

module.exports = productsManager;
