import { Router } from 'express';
import checkoutController from '../controllers/checkoutController.js';
const router = Router();

router.post('/', checkoutController.postCheckout);
router.get('/', checkoutController.getOrder);

export default router;
