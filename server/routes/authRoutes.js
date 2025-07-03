import express from 'express';
import {
  register,
  login,
  logout,
  verifyEmail,
  sendVerifyOtp,
  sendResetOtp,
  resetPassword,
  isAuthenticated
} from '../controllers/authController.js';

const router = express.Router();

// Routes d'authentification
router.post('/signup', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/verify-account', verifyEmail);
router.post('/send-verify-otp', sendVerifyOtp);
router.post('/send-reset-otp', sendResetOtp);
router.post('/reset-password', resetPassword);
router.get('/isAuth', isAuthenticated);

export default router;