import { Router } from 'express';
import passport from 'passport';
import loginController from '../controllers/loginController.js';
const router = Router();

router.post('/', passport.authenticate('login'), loginController.postLogin);

export default router;
