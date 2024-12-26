import express from 'express';
import { login, logout, signup } from '../controllers/auth.controoler.js';

const router = express.Router();

router.post('/logout', logout)

router.post('/signup', signup)

router.post('/login', login)

export default router;