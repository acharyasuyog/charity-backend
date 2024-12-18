import express from 'express';
import {
  createFundPost,
  getAllFundPosts,
  getFundPostById,
} from '../controllers/fundPost.controller';
const router = express.Router();

router.post('/', createFundPost);
router.get('/', getAllFundPosts);
router.get('/:id', getFundPostById);

export default router;
