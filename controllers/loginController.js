// const Producto = require('../models/producto');
const productoDao = require('../models/dao/productoDAO');

const login = async (req, res) => {
	try {
		//const lista = await Producto.find().lean();
		const lista = await productoDao.getAll();
		if (!lista.length) throw Error();
		res.render('login', { user: req.user ? req.user.userName : null, lista: lista, existe: true });
	} catch (err) {
		res.render('login', { user: req.user ? req.user.userName : null, lista: [], existe: false });
	}
};

const logout = (req, res) => {
	try {
		const userName = req.user ? req.user.username : null;
		if (!userName) return res.redirect('/login');
		req.logout();
		res.status(200).render('logout', { user: userName });
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

const postLogin = async (req, res) => {
	try {
		res.redirect('/login');
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
};

const failLogin = (req, res) => {
	res.render('fail', { message: 'USER ERROR LOGIN', url: '/login' });
};

const signUp = (req, res) => {
	res.render('signup');
};

const failSingUp = (req, res) => {
	res.render('fail', { message: 'USER ERROR SIGNUP', url: '/signup' });
};

module.exports = {
	login,
	postLogin,
	logout,
	failLogin,
	signUp,
	failSingUp
};
