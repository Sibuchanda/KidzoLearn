import express from 'express';
import {completeTask, getUserProgress } from '../controler/taskControler.js';
import { authenticate } from '../middleware/authorize.js';

const router = express.Router();

router.post('/play', authenticate, completeTask);
router.get('/progress', authenticate, getUserProgress);


export default router;