import express from 'express';
import {
  createFundPost,
  getAllFundPosts,
  getFundPostById,
} from '../controllers/fundPost.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/', verifyToken, createFundPost);
router.get('/', getAllFundPosts);
router.get('/:id', getFundPostById);

export default router;
