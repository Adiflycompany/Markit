import express from 'express';
import {
  register,
  login,
  deleteAccount,
  forgotPassword,
  resetPassword,
} from '../controllers/userController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete', deleteAccount);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;