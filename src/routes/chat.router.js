import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import chatController from '../controllers/chatController.js';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const router = Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/chat.html'));
});

router.get('/:email', chatController.getByEmail);

export default router;
