const yargs = require('yargs/yargs');

const args = yargs(process.argv.slice(2))
  .alias({ p: 'PORT' })
  .default({ p: 8080 }).argv;

const PORT = {
  PORT: args.PORT,
};

module.exports = PORT.PORT;
