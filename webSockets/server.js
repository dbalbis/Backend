const fs = require('fs');
const express = require('express');
const app = express();
const puerto = 8080;
const path = require('path');
const { Server: IOServer } = require('socket.io');
const expressServer = app.listen(puerto, (err) => {
  if (err) {
    console.log(`Se produjo un error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor escuchando puerto: ${puerto}`);
  }
});
const io = new IOServer(expressServer);

let data = [];
let messages = [];

app.use(express.static(path.join(__dirname, '/public')));

/* Creo archivo CHATS */

async function escribir() {
  try {
    await fs.promises.writeFile(
      path.join(__dirname, '/chat'),
      JSON.stringify(messages)
    );
  } catch (err) {
    console.log('no se pudo guardar el chat', err);
  }
}

/* Atajando conexiones  */

io.on('connection', async (socket) => {
  console.log(`Se conecto un usuario: ${socket.id}`);
  console.log('EL ARRAY TIENE', messages.length);

  io.emit('server:envioproductos', data); //envio todos los productos

  socket.on('client:envioproduct', (productObject) => {
    data.push(productObject); //recibo productos
    console.log(data);
    io.emit('server:envioproductos', data); //emito productos recibidos a los usuarios
  });
  // PARTE CHAT _ LADO SERVIDOR
  io.emit('server:enviomessages', messages); //envio CHATS a todos los usuarios

  socket.on('client:enviomessage', (messageObject) => {
    messages.push(messageObject); //RECIBO mensaje y lo anido
    console.log(messages);
    escribir();
    io.emit('server:enviomessages', messages); //EMITO CHATS
  });
});
