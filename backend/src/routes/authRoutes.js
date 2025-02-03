import {Router} from 'express';
import passport from 'passport';
import {register, login, authStatus, logout, setup2FA, verify2FA, reset2FA} from '../controllers/authController.js';

const router = Router();

// Rigistration Route
router.post('/register', register);
// Login Route
router.post('/login', passport.authenticate('local'), login);
// Auth Status Route
router.get('/status', authStatus);
// Logout Route
router.get('/logout', logout);
// 2FA setup Route
router.post('/2fa/setup', setup2FA);
// 2FA verify Route
router.post('/2fa/verify', verify2FA);
// Reset Route
router.post('/2fa/reset', reset2FA);

export default router;