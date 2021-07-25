const express = require('express');
const passport = require('passport');
const loginController = require('../controllers/loginController');

const router = express.Router();

router
	.route('/login')
	.get(loginController.login)
	.post(passport.authenticate('login', { failureRedirect: '/faillogin' }));

router.get('/faillogin', loginController.failLogin);

router.get('/logout', loginController.logout);

router
	.route('/signup')
	.get(loginController.signUp)
	.post(passport.authenticate('signup', { failureRedirect: '/failsignup' }), loginController.postLogin);

router.get('/failsignup', loginController.failSingUp);

module.exports = router;
