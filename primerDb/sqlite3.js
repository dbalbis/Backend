const knex = require('knex');
const path = require('path');

const DB = {
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, './db/db.sqlite'),
  },
  useNullAsDefault: true,
};

const configSqlDB = knex(DB);

module.exports = configSqlDB;
