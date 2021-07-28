const Mensaje = require("./mensaje");
const mensajeDTO = require("./mensajeDTO");
require("./mongoConnect");

const getAll = async () => {
  try {
    return await Mensaje.find().lean();
  } catch (err) {
    throw err;
  }
};

const getById = async (id) => {
  try {
    return await Mensaje.findById(id);
  } catch (err) {
    throw err;
  }
};

const addOne = async (item) => {
  try {
    const newItem = new Mensaje(mensajeDTO(item));
    return await newItem.save();
  } catch (err) {
    throw err;
  }
};

const updateById = (id, item) => {
  try {
    await Mensaje.findByIdAndUpdate(id, mensajeDTO(item));
  } catch (err) {
    throw err;
  }
};

const deleteById = (id) => {
  try {
    const item = await Mensaje.findById(id);
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
