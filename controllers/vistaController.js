const productoDao = require('../models/dao/productoDAO');

const productosVista = async (req, res) => {
	try {
		const lista = await productoDao.getAll();
		if (!lista.length) throw Error();
		res.render('productos-vista', { lista: lista, existe: true, user: req.user ? req.user : null });
	} catch (err) {
		res.render('productos-vista', { lista: [], existe: false, user: req.user ? req.user : null });
	}
};

const productosRegistrar = async (req, res) => {
	try {
		const lista = await productoDao.getAll();
		if (!lista.length) throw Error();
		res.render('ingreso-producto', { lista: lista, existe: true, user: req.user ? req.user : null });
	} catch (err) {
		res.render('ingreso-producto', { lista: [], existe: false, user: req.user ? req.user : null });
	}
};

module.exports = {
	productosVista,
	productosRegistrar
};
