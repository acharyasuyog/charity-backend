import express from 'express';
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} from '../controllers/category.controller.js';
const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategory);

export default router;
