const yargs = require('yargs/yargs');

const args = yargs(process.argv.slice(2))
  .alias({ p: 'PORT' })
  .default({ p: 3000 }).argv;

const PORT = {
  PORT: args.PORT,
};

module.exports = PORT.PORT;
