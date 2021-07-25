const Producto = require('../models/producto');

const productosVista = async (req, res) => {
	try {
		const lista = await Producto.find().lean();
		if (!lista.length) throw Error();
		res.render('productos-vista', { lista: lista, existe: true });
	} catch (err) {
		res.render('productos-vista', { lista: [], existe: false });
	}
};

const productosRegistrar = async (req, res) => {
	try {
		const lista = await Producto.find().lean();
		if (!lista.length) throw Error();
		res.render('ingreso-producto', { lista: lista, existe: true });
	} catch (err) {
		res.render('ingreso-producto', { lista: [], existe: false });
	}
};

module.exports = {
	productosVista,
	productosRegistrar,
};
