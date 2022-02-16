const { Router } = require('express');
const googleAuthController = require('../controllers/google-auth-controllers');

const router = Router();

router.get('/auth/google/url', googleAuthController.getGoogleAuthURL);
router.get('/login/google-auth', googleAuthController.googleAuthLog);
router.get('/google-login-redirect', googleAuthController.verifyGoogleAuthToken);

module.exports = router;
