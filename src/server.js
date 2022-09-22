import express from 'express';
const app = express();
import config from './config.js';
import routes from './routes/routes.js';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'url';
import path from 'path';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

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

/* RUTAS */

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

/* Server */
app.listen(config.PORT, (err) => {
  if (err) {
    console.log(`Se produjo un error al iniciar el servidor: ${err}`);
  } else {
    console.log(`Servidor escuchando puerto: ${config.PORT}`);
  }
});
