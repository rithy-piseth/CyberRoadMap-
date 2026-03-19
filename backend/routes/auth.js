const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  register,
  login,
  verifyOTP,
  resendOTP,
  googleCallback
} = require('../controllers/authController');

// ── Standard Auth ─────────────────────────────────────────
router.post('/register', register);
router.post('/login', login);

// ── OTP ───────────────────────────────────────────────────
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

// ── Google OAuth ──────────────────────────────────────────
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`, session: false }),
  googleCallback
);

module.exports = router;