import { Router } from 'express';
import registerRouter from './register.router.js';
import loginRouter from './login.router.js';
import logoutRouter from './logout.router.js';
import configRouter from './config.router.js';
import chatRouter from './chat.router.js';
import productosRouter from './productos.router.js';
import cartRouter from './cart.router.js';
import checkoutRouter from './checkout.router.js';

const router = Router();

/* Index con vistas de la config */
router.use('/', configRouter);
/* Register */
router.use('/register', registerRouter);
/* Login */
router.use('/login', loginRouter);
/* Logout */
router.use('/logout', logoutRouter);
/* Chat */
router.use('/chat', chatRouter);
/* Productos */
router.use('/productos', productosRouter);
/* Cart */
router.use('/carrito', cartRouter);
/* Checkout */
router.use('/checkout', checkoutRouter);

export default router;
