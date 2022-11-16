import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import productsController from '../controllers/productsController.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', productsController.getAllProducts);
router.post('/', productsController.addProduct);
router.get('/:id', productsController.getById);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);
router.get('/categoria/:category', productsController.getByCategory);

export default router;
