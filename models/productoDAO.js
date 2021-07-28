const Producto = require("./producto");
const productoDTO = require("./productoDTO");
require("./mongoConnect");

const getAll = async () => {
  try {
    return await Producto.find().lean();
  } catch (err) {
    throw err;
  }
};

const getById = async (id) => {
  try {
    return await Producto.findById(id);
  } catch (err) {
    throw err;
  }
};

const addOne = async (item) => {
  try {
    const newItem = new Producto(productoDTO(item));
    return await newItem.save();
  } catch (err) {
    throw err;
  }
};

const updateById = (id, item) => {
  try {
    await Producto.findByIdAndUpdate(id, productoDTO(item));
  } catch (err) {
    throw err;
  }
};

const deleteById = (id) => {
  try {
    const item = await Producto.findById(id);
    await item.remove();
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAll,
  getById,
  addOne,
  updateById,
  deleteById,
};
