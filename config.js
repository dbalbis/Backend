const yargs = require('yargs/yargs');

const args = yargs(process.argv.slice(2))
  .alias({ p: 'PORT', m: 'MODE' })
  .default({ p: 8080, m: 'FORK' }).argv;

const CONFIG = {
  PORT: args.PORT,
  MODE: args.MODE,
};

module.exports = { CONFIG };
