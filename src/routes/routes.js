import { Router } from 'express';
const router = Router();
import multer from 'multer';
import registerController from '../controllers/registerController.js';
import productsController from '../controllers/productsController.js';
import loginController from '../controllers/loginController.js';
import checkoutController from '../controllers/checkoutController.js';
import { fileURLToPath } from 'url';
import path from 'path';
import passport from 'passport';
import { checkAuth, checkAuthLogout, checkAuthNo } from '../utils/checkauth.js';
import cartsController from '../controllers/cartsController.js';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//Multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../public/uploads/avatars');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get('/', checkAuthNo, productsController.getAll);
// Register

router.get('/register', checkAuth, (req, res) => {
  res.render('register');
});

router.post(
  '/register',
  upload.single('avatar'),
  (req, res, next) => {
    const file = req.file;
    if (!file)
      return res.status(400).json('Error al subir archivo de imagen (avatar)');
    next();
  },
  registerController.postRegister
);

/* Login */

router.get('/login', checkAuth, (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('login', { failureRedirect: '/login/error' }),
  loginController.postLogin
);

router.get('/login/error', (req, res) => {
  res.status(400).json('Invalid Credentials!');
});

/* Logout */

router.get('/logout', checkAuthLogout, (req, res) => {
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

/* Productos */

router.post('/api/productos', productsController.postProduct);
router.get('/api/productos', productsController.getAll);

/* Carrito */
router.post('/api/carrito/:_id', cartsController.createCart);
router.post('/api/:_id/productos', cartsController.addProduct);

/* Checkout */
router.get('/checkout', checkoutController.getCheckout);

export default router;
