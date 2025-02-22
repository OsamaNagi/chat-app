import express from 'express';
import { is_auth } from '../middlewares/auth.middleware.js';
import { getUsersForSidebar, getMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users', is_auth, getUsersForSidebar);
router.get('/:id', is_auth, getMessages);

export default router;
