const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const usuarioDao = require('../models/dao/usuarioDAO');

passport.use(
	'login',
	new LocalStrategy(
		{
			passReqToCallback: true
		},
		async function(req, username, password, done) {
			try {
				const user = await usuarioDao.getAll({ username: username });
				if (!user.length) return done(null, false);
				const authorization = await usuarioDao.correctPassword(password, user[0]._id);
				if (!authorization) return done(null, false);
				return done(null, user[0]);
			} catch (err) {
				throw err;
			}
		}
	)
);

passport.use(
	'signup',
	new LocalStrategy(
		{
			passReqToCallback: true
		},
		function(req, username, password, done) {
			findOrCreateUser = async function() {
				try {
					const userExists = await usuarioDao.getAll({ username: username });
					if (!!userExists.length) return done(null, false);
					const newUser = await usuarioDao.addOne(req.body);
					return done(null, newUser);
				} catch (err) {
					throw err;
				}
			};
			process.nextTick(findOrCreateUser);
		}
	)
);

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
	try {
		const user = await usuarioDao.getById(id);
		done(null, user);
	} catch (err) {
		throw err;
	}
});
