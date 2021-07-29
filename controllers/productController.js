//const Producto = require('../models/producto');
const productoDao = require("../models/dao/productoDAO");
const { deleteFile } = require("../utils/fileManager");

//GET
const getAllProducts = async (req, res) => {
  try {
    //const lista = await Producto.find();
    const lista = await productoDao.getAll();
    res.status(200).json(lista);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
const getProduct = async (req, res) => {
  try {
    //const producto = await Producto.findById(req.params.id);
    const producto = await productoDao.getById(req.params.id);
    res.status(200).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//POST
const createProduct = async (req, res) => {
  try {
    // const newProducto = new Producto({
    // 	title: req.body.title,
    // 	price: req.body.price,
    // 	thumbnail: '/uploads/' + req.file.filename
    // });
    // await newProducto.save();
    const newProducto = await productoDao.addOne({
      title: req.body.title,
      price: req.body.price,
      thumbnail: "/uploads/" + req.file.filename,
    });
    res.status(201).json(newProducto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//PUT
const updateProduct = async (req, res) => {
  try {
    //const producto = await Producto.findById(req.params.id);
    const producto = await productoDao.getById(req.params.id);
    if (!!req.file) {
      req.body.thumbnail = "/uploads/" + req.file.filename;
      await deleteFile(`./public/${producto.thumbnail}`);
    }
    //await Producto.findByIdAndUpdate(req.params.id, req.body);
    await productoDao.updateById(req.params.id, req.body);
    const updatedProduct = await productoDao.getById(req.params.id);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//DELETE
const deleteProduct = async (req, res) => {
  try {
    //const producto = await Producto.findById(req.params.id);
    const producto = await productoDao.getById(req.params.id);
    if (producto.thumbnail.includes("uploads"))
      await deleteFile(`./public/${producto.thumbnail}`);
    //await producto.remove();
    await productoDao.deleteById(req.params.id);
    res.status(200).json(producto);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
