import express from 'express';
import config from './config.js';
import routes from './routes/index.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
import path from 'path';
import { Server as IOServer } from 'socket.io';
import chatController from './controllers/chatController.js';
import { engine } from 'express-handlebars';
const app = express();
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CONFIG HBS */

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname + '/views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname, '/views/layouts'),
    partialsDir: path.join(__dirname, '/views/partials'),
  })
);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');

/* Server */

const serverExpress = app.listen(config.PORT, (err) => {
  if (err) {
    console.log(`Se produjo un error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor escuchando puerto: ${config.PORT}`);
  }
});

/* Socket IO - Chat  */

const io = new IOServer(serverExpress);

io.on('connection', async (socket) => {
  console.log(`Se conecto un usuario: ${socket.id}`);
  const messages = await chatController.getAllMessages();
  io.emit('server:message', messages);

  socket.on('message', async (email, msg) => {
    await chatController.addMessage(email, msg);
    const reSendMessages = await chatController.getAllMessages();
    io.emit('server:message', reSendMessages);
  });
});

/* COOKIE PARSER */

app.use(cookieParser());

/* SESSION DE MONGO ATLAS */

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.URLMONGO,
      mongoOptions,
    }),
    secret: config.SECRETMONGO,
    resave: false,
    saveUninitialized: false,
    rolling: true, // Reinicia el tiempo de expiracion con cada request
    cookie: {
      maxAge: 600000,
      httpOnly: false,
      secure: false,
    },
  })
);

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

// RUTAS

app.use('/', routes);

//NO EXISTENCIA ROUTES
app.use((req, res, next) => {
  const err = new Error('Not found!');
  err.status = 404;
  next(err);
});

//ERRORES
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: { status: err.status || 500, message: err.message } });
});
