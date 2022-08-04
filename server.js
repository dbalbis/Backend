const express = require('express');
const app = express();
const path = require('path');
const { Server: IOServer } = require('socket.io');
const { createServer } = require('http');
const productsManager = require('./controllers/contenedor');
const messagesManager = require('./controllers/contenedormensajes');
const routes = require('./routes/index.js');
/* SQLITE3 MENSAJES*/
const configSqlDB = require('./sqlite3');
const messagesContainer = new messagesManager(configSqlDB, 'message');
/* MARIA DB - PRODUCTOS */
const configMariaDB = require('./mariadb');
const productsContainer = new productsManager(configMariaDB, 'product');

const PORT = process.env.PORT || 8080;
const serverExpress = app.listen(PORT, (err) =>
  err
    ? console.log(`Error en el server: ${err}`)
    : console.log(`Server listening on PORT: ${PORT}`)
);

const io = new IOServer(serverExpress);
/* ROUTES */
app.use('/', routes);
app.use(express.static(path.join(__dirname, '/public')));

io.on('connection', async (socket) => {
  console.log(`Socket ID: ${socket.id} connected`);
  /* PRODUCTOS */
  const data = await productsContainer.getAll();
  socket.emit('server:envioproductos', data);

  socket.on('client:envioproduct', async (productObject) => {
    const { title, price, thumbnail } = productObject;
    await productsContainer.newProduct(title, price, thumbnail); //recibo productos
    const data = await productsContainer.getAll();
    io.emit('server:envioproductos', data); //emito productos recibidos a los usuarios
  });
  /* MENSAJES */
  const messages = await messagesContainer.getAllMessages();
  socket.emit('server:enviomessages', messages); //envio CHATS a todos los usuarios
  socket.on('client:enviomessage', async (messageObject) => {
    const { email, message } = messageObject;
    date = new Date().toLocaleDateString();
    await messagesContainer.newMessages(email, date, message); //RECIBO mensaje y lo anido
    const messages = await messagesContainer.getAllMessages();
    io.emit('server:enviomessages', messages); //EMITO CHATS
  });
});
