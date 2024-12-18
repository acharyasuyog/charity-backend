import { Router } from 'express';
const router = Router();
import authRouter from '../routes/auth.routes.js';
import fundPostRouter from '../routes/fundPost.route.js';
router.use('/auth', authRouter);
router.use('/fundPost', fundPostRouter);

export default router;
