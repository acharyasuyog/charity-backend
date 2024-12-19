import { Router } from 'express';
const router = Router();
import authRouter from '../routes/auth.routes.js';
import campgaignRouter from '../routes/campaign.route.js';
import donationRouter from '../routes/donation.routes.js';
router.use('/auth', authRouter);
router.use('/campaign', campgaignRouter);
router.use('/donation', donationRouter);
export default router;
