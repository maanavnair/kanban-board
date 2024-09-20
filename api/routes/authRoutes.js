const { Router } = require('express');
const authControllers = require('../controllers/authController');

const router = Router();
router.post('/signup', authControllers.signup_post);
router.post('/login', authControllers.login_post);
router.post('/logout', authControllers.logout);

module.exports = router;