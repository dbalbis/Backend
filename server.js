const express = require('express');
const app = express();
const path = require('path');
const { Server: IOServer } = require('socket.io');
const productsManager = require('./controllers/contenedor');
const messagesManager = require('./controllers/contenedormensajes');
/* SQLITE3 MENSAJES*/
const configSqlDB = require('./sqlite3');
const messagesContainer = new messagesManager(configSqlDB, 'message');
/* MARIA DB - PRODUCTOS */
const configMariaDB = require('./mariadb');
const productsContainer = new productsManager(configMariaDB, 'product');
/* MONGO STORE SESION Y COOKIE PARSER */

const MongoStore = require('connect-mongo');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const serverExpress = app.listen(PORT, (err) =>
  err
    ? console.log(`Error en el server: ${err}`)
    : console.log(`Server listening on PORT: ${PORT}`)
);

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://dbalbis:44516235@cluster0.bnrauug.mongodb.net/db?retryWrites=true&w=majority',
      mongoOptions,
    }),
    secret: 'coderhouse',
    resave: false,
    saveUninitialized: false,
    rolling: true, // Reinicia el tiempo de expiracion con cada request
    cookie: {
      maxAge: 30000,
    },
  })
);

/* CHECKER */

function loginMiddleware(req, res, next) {
  if (req.session.username) {
    res.redirect('/');
  } else {
    next();
  }
}

function authMiddleware(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    res.redirect('/login');
  }
}

/* RUTAS */

app.get('/login', loginMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

app.get('/', authMiddleware, (req, res) => {});

app.get('/api/login', (req, res) => {
  try {
    console.log('El usuario es:', req.query.username);
    req.session.username = req.query.username;
    res.redirect('/');
  } catch (err) {
    res.json({ error: true, message: err });
  }
});

/* SOCKET */

const io = new IOServer(serverExpress);

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
