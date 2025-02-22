import express from 'express';
import { checkAuth, login, logout, register, updateProfile } from '../controllers/auth.controller.js';
import { is_auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

router.put('/update-profile', is_auth, updateProfile);

router.get('/check', is_auth, checkAuth);

export default router;
