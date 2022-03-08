const { Router } = require('express');
const googleAuthController = require('../controllers/google-auth-controllers');

const router = Router();

// Returns to google auth url for login
router.get('/auth/google/url', googleAuthController.getGoogleAuthURL);
router.get('/login/google-auth', googleAuthController.googleAuthCheckDbSendJWT);
router.get('/google-login-redirect', googleAuthController.verifyGoogleAuthToken);

module.exports = router;
