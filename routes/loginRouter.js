const express = require('express');
const passport = require('passport');
const loginController = require('../controllers/loginController');

const router = express.Router();

router
	.route('/login')
	.get(loginController.login)
	.post(passport.authenticate('login', { successRedirect: '/home', failureRedirect: '/faillogin' }), loginController.postLogin);

router.get('/faillogin', loginController.failLogin);

router.get('/logout', loginController.logout);

router
	.route('/signup')
	.get(loginController.signUp)
	.post(passport.authenticate('signup', { successRedirect: '/home', failureRedirect: '/failsignup' }));

router.get('/failsignup', loginController.failSingUp);

module.exports = router;
