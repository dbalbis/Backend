const knex = require('knex');
const path = require('path');

const DB = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './db/db.sqlite'),
  },
  useNullAsDefault: true,
};

const DBprod = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './db/dbprod.sqlite'),
  },
  useNullAsDefault: true,
};

const configSqlDB = knex(DB);
const configSqlDBProd = knex(DBprod);

module.exports = { configSqlDB, configSqlDBProd };
