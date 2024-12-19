import express from 'express';

import verifyToken from '../middlewares/auth.middleware.js';
import {
  createCampaign,
  getAllCampaigns,
  getCampaignbyId,
} from '../controllers/campaign.controller.js';
const router = express.Router();

router.post('/', verifyToken, createCampaign);
router.get('/', getAllCampaigns);
router.get('/:id', getCampaignbyId);
export default router;
