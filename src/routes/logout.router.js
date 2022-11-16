import { Router } from 'express';
import passport from 'passport';
import logoutController from '../controllers/logoutController.js';
const router = Router();

router.post('/', logoutController.postLogout);

export default router;
