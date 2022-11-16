import { Router } from 'express';
import checkoutController from '../controllers/checkoutController.js';
const router = Router();

router.post('/', checkoutController.postCheckout);

export default router;
