class productsManager {
  constructor(configSqlDBProd, tableName) {
    try {
      this.dbSqldb = configSqlDBProd;
      this.tableName = tableName;
      configSqlDBProd.schema.hasTable(tableName).then(function (exists) {
        if (!exists) {
          return configSqlDBProd.schema.createTable(tableName, (table) => {
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
    let rows = await this.dbSqldb.from(this.tableName).select('*');

    return rows;
  }

  async newProduct(title, price, thumbnail) {
    const elemento = {
      title,
      price,
      thumbnail,
    };
    const product = await this.dbSqldb.from(this.tableName).insert(elemento);
    return product;
  }
}

module.exports = productsManager;
