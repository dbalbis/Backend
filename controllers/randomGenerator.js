const util = require('util');

const generarAleatorios = (cant) => {
  const numeros = {};
  for (let i = 1; i <= cant; i++) {
    const number = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
    if (!numeros[number]) {
      numeros[number] = 1;
    } else {
      numeros[number]++;
    }
  }
  console.log(
    util.inspect(numeros, { showHidden: false, depth: null, colors: true })
  );
  return numeros;
};

process.on('message', (msg) => {
  process.send(generarAleatorios(msg));
});
