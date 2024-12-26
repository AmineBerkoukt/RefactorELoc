import express from 'express';
import passport from '../config/passport.js';
import { googleOAuth2Callback } from '../controllers/oauth2Controller.js';

const router = express.Router();



// Redirect to Google for authentication
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
    '/google/redirect',
    passport.authenticate('google', { session: false }),
    googleOAuth2Callback
);

export default router;
