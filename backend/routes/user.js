import express from 'express';

import { signup, login, logout } from '../controler/userControler.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/signin',login);
router.post('/logout', logout);


export default router;