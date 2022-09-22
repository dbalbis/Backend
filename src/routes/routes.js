import { Router } from 'express';
const router = Router();
import multer from 'multer';
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';
import { fileURLToPath } from 'url';
import path from 'path';
import passport from 'passport';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/../public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  res.render('index');
});

// Register
router.get('/register', (req, res) => {
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

router.get('/login', (req, res) => {
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

export default router;
