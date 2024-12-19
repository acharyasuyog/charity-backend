import express from 'express';
import { createDonation } from '../controllers/donation.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
const router = express.Router();
router.post('/', verifyToken, createDonation);

export default router;
