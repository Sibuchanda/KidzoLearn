import express from 'express';

import { signup, login, getProfile, logout } from '../controler/userControler.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/profile', getProfile);
router.post('/logout', logout);


export default router;