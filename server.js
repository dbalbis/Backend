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

/* Auth */

const { checkAuth, checkAuthLogout } = require('./middlewares/checkauth');

/* Hash Password */

const { hashPassword, isValidPassword } = require('./utils/hashpassword');

/* Routes */

const routes = require('./controllers/routes');

/* DotENV */

require('dotenv').config();

/* Config */

const { CONFIG } = require('./config');
const PORT = CONFIG.PORT;
const MODE = CONFIG.MODE;

const iscluster = MODE == 'CLUSTER';

/* HANDLEBARS */

const { engine } = require('express-handlebars');

/* Mongoose */

const mongoose = require('mongoose');
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

/* MODO FORK Y CLUSTER */

const os = require('os');
const cluster = require('cluster');
const cpus = os.cpus();

/* Compression */
const compression = require('compression');

/* Logger WINSTON */

const logger = require('./logs/logger');

if (iscluster && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });
  cluster.on('exit', (worker) => {
    logger.info(`Worker ${worker.process.pid} died.`);
    cluster.fork();
  });
} else {
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

  app.use(express.static(`${__dirname}/public`));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGOURL,
        mongoOptions,
      }),
      secret: process.env.SECRET,
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

  /* SERVER */
  const serverExpress = app.listen(PORT, (err) =>
    err
      ? logger.error(`Error en el server: ${err}`)
      : logger.info(
          `Server listening on PORT: ${PORT} Mode: ${MODE} - Worker: ${process.pid}`
        )
  );

  /* STRATEGY */
  const signupStrategy = new LocalStrategy(
    { passReqToCallback: true },

    async (req, username, password, done) => {
      try {
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
        logger.error(err);
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
  mongoose.connect(process.env.MONGOURL, (err, res) => {
    if (err) throw err;
    return logger.info('Base de datos MONGO conectada.');
  });

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });

  /****  RUTAS ******/

  //Registrar todas las peticiones en el logger.
  app.use((req, res, next) => {
    logger.info(`Petición recibida | Ruta: ${req.url} - Método: ${req.method}`);
    next();
  });

  /* REGISTER */
  app.get('/register', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, './public/signup.html'));
  });

  /* Error Register */

  app.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/failsignup' }),
    routes.postSignup
  );

  app.get('/failsignup', checkAuth, routes.getFailsignup);

  /* LOGIN */

  app.get('/login', checkAuth, (req, res) => {
    res.sendFile(path.join(__dirname, './public/login.html'));
  });

  app.post(
    '/login',
    passport.authenticate('login', { failureRedirect: '/failsignup' }),
    routes.getLogin
  );

  app.get('/faillogin', checkAuth, routes.getFaillogin);

  app.get('/', (req, res) => {});

  app.get('/logout', checkAuthLogout, (req, res) => {
    let user = req.user.username;
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.send(`<h1>Hasta luego ${user}</h1>
  <script type="text/javascript">
  setTimeout(function(){ location.href = '/'},2000)
  </script>`);
    });
  });
  /* PARA OBTENER EL NOMBRE DE USUARIO :( */
  app.get('/api/user-info', (req, res) => {
    if (req.user) {
      let user = req.user.username;
      let email = req.user.email;
      res.json({ username: user, email: email });
    } else {
      res.json({});
    }
  });

  /* PARA OBTENER LA INFO DEL PROCESS */
  app.get('/info', compression(), (req, res) => {
    const info = {
      args: process.argv.slice(2),
      platform: process.platform,
      version: process.version,
      rss: process.memoryUsage.rss(),
      path: process.argv[0],
      pid: process.pid,
      folder: process.argv[1],
      cpus: cpus.length,
    };
    //console.log(info);
    res.render('processInfo', info);
  });

  /* PARA OBTENER LA INFO DEL PROCESS */
  app.get('/info-nogzip', (req, res) => {
    const info = {
      args: process.argv.slice(2),
      platform: process.platform,
      version: process.version,
      rss: process.memoryUsage.rss(),
      path: process.argv[0],
      pid: process.pid,
      folder: process.argv[1],
      cpus: cpus.length,
    };
    res.render('processInfo', info);
  });

  /* NUMEROS RANDOMS */
  app.get('/api/randoms', routes.getRandoms);

  //  FAIL ROUTE
  app.get('*', routes.failRoute);

  /* SOCKET */

  const io = new IOServer(serverExpress);

  io.on('connection', async (socket) => {
    logger.info(`Socket ID: ${socket.id} connected`);

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
}
