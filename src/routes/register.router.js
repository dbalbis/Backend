import { Router } from 'express';
import registerController from '../controllers/registerController.js';
const router = Router();

router.post('/', registerController.postRegister);

export default router;
