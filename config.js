const yargs = require('yargs/yargs');

/* DotENV */

require('dotenv').config();

const args = yargs(process.argv.slice(2))
  .alias({ p: 'PORT', m: 'MODE' })
  .default({ p: 8080, m: 'FORK' }).argv;

const CONFIG = {
  PORT: args.PORT,
  MODE: args.MODE,
  URLMONGO: process.env.MONGOURL,
  SECRETMONGO: process.env.SECRET,
};

module.exports = { CONFIG };
