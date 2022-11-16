import { Router } from 'express';
import registerController from '../controllers/registercontroller.js';
const router = Router();

router.post('/', registerController.postRegister);

export default router;
