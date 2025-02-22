import express from 'express';
import { is_auth } from '../middlewares/auth.middleware.js';
import { getUsersForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', is_auth, getUsersForSidebar);
router.get('/:id', is_auth, getMessages);

router.post('/send/:id', is_auth, sendMessage);

export default router;
