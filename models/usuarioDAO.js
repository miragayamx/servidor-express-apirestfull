const Usuario = require("./usuario");
const usuarioDTO = require("./usuarioDTO");
require('./mongoConnect');

const getAll = async () => {
    try {
      return await Usuario.find().lean();
    } catch (err) {
      throw err;
    }
  };
  
  const getById = async (id) => {
    try {
      return await Usuario.findById(id);
    } catch (err) {
      throw err;
    }
  };
  
  const addOne = async (item) => {
    try {
      const newItem = new Usuario(usuarioDTO(item));
      return await newItem.save();
    } catch (err) {
      throw err;
    }
  };
  
  const updateById = (id, item) => {
    try {
      await Usuario.findByIdAndUpdate(id, usuarioDTO(item));
    } catch (err) {
      throw err;
    }
  };
  
  const deleteById = (id) => {
    try {
      const item = await Usuario.findById(id);
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