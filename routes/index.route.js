import { Router } from 'express';
const router = Router();
import authRouter from '../routes/auth.routes.js';

router.use('/auth', authRouter);

export default router;
