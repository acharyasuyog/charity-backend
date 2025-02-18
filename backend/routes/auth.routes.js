import express from 'express';
import {
  login,
  register,
  uploadProfileImage,
} from '../controllers/auth.controller.js';
import upload from '../middlewares/multer.middleware.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
// router.put('/uploadProfileImage', uploadProfileImage);
router.put(
  '/uploadProfileImage',
  verifyToken,
  upload.single('profileImage'),
  uploadProfileImage,
);

export default router;
