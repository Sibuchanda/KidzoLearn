import express from 'express';
import {completeTask, getUserProgress } from '../controler/taskControler.js';

const router = express.Router();


router.post('/play',completeTask);
router.get('/progress',getUserProgress);


export default router;