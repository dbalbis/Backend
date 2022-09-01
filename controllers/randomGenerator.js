const util = require('util');
let arrayNumeros = [];
let veces = 1;
const random = (cant, res) => {
  for (let ciclo = 0; ciclo < cant; ciclo++) {
    if (ciclo < cant) {
      const numero = Math.floor(Math.random() * (1000 - 1 + 1) + 1);
      arrayNumeros.forEach(
        (numero) => numero === arrayNumeros[numero] && veces++
      );
      arrayNumeros.push({ Numero: numero, Veces: veces });
    }
  }
  console.log(
    util.inspect(arrayNumeros, { showHidden: false, depth: null, colors: true })
  );
  return arrayNumeros;
};

process.on('message', (msg) => {
  process.send(random(msg));
});

process.send('listo');
