import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cartController from '../controllers/cartController.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const router = Router();

/* Crear carrito al usuario */
router.post('/', cartController.createCart);
/* Traer el carrito del usuario */
router.get('/', cartController.getCart);

/* Agregar un producto al carrito  */
router.post('/productos', cartController.addProduct);
/* Eliminar un producto del carrito  */
router.delete('/productos', cartController.removeProduct);

export default router;
