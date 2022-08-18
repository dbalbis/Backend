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

/* Passport */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/* Users */
const User = require('./models');

/* Bcrypt */

const bcrypt = require('bcrypt');

/* Routes */

const routes = require('./routes/routes');

/* Mongoose */

const mongoose = require('mongoose');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
      maxAge: 600000,
      httpOnly: false,
      secure: false,
    },
  })
);

/* Passport */
app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 8080;
const serverExpress = app.listen(PORT, (err) =>
  err
    ? console.log(`Error en el server: ${err}`)
    : console.log(`Server listening on PORT: ${PORT}`)
);

/* HashPassword */

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(reqPassword, hashedPassword) {
  return bcrypt.compareSync(reqPassword, hashedPassword);
}

const signupStrategy = new LocalStrategy(
  { passReqToCallback: true },

  async (req, username, password, done) => {
    try {
      console.log('Estoy aca!');
      const existingUser = await User.findOne({ username: username });

      if (existingUser) {
        return done(`Usuario ya registrado!`, false);
      }

      const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword(password),
      };

      const createdUser = await User.create(newUser);

      return done(null, createdUser);
    } catch (err) {
      console.log(err);
      done(err);
    }
  }
);

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ username: username });

  if (!user || !isValidPassword(password, user.password)) {
    return done('Invalid credentials', null);
  }

  return done(null, user);
});

passport.use('register', signupStrategy);
passport.use('login', loginStrategy);

/* Conectamos MONGO */
mongoose.connect(
  'mongodb+srv://dbalbis:44516235@cluster0.bnrauug.mongodb.net/db?retryWrites=true&w=majority',
  (err, res) => {
    if (err) throw err;
    return console.log('Base de datos MONGO conectada.');
  }
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

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

/****  RUTAS ******/

/* REGISTER */
app.get('/register', loginMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, './public/signup.html'));
});

app.post(
  '/register',
  passport.authenticate('register', { failureRedirect: '/failsignup' }),
  routes.postSignup
);

app.get('/failsignup', routes.getFailsignup);

/* LOGIN */

app.get('/login', loginMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

app.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/failsignup' }),
  routes.getLogin
);

app.get('/login', loginMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

app.get('/faillogin', routes.getFaillogin);

app.get('/api/login', (req, res) => {
  try {
    console.log('El usuario es:', req.query.username);
    req.session.username = req.query.username;
    res.redirect('/');
  } catch (err) {
    res.json({ error: true, message: err });
  }
});

app.get('/', authMiddleware, (req, res) => {});

app.get('/logout', authMiddleware, (req, res) => {
  res.send(`<h1>Hasta luego ${req.session.username}</h1>
  <script type="text/javascript">
  setTimeout(function(){ location.href = '/'},2000)
  </script>`);
  req.session.destroy((err) => {
    if (err) {
      console.log('error en el Logout:', err);
    }
  });
});

/* PARA OBTENER EL NOMBRE DE USUARIO :( */
app.get('/api/user-info', (req, res) => {
  res.json({ username: req.session.username });
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
