const express = require('express');
const vistaController = require('../controllers/vistaController');

const router = express.Router();

router.get('/home', vistaController.productosVista);
router.get('/registrar', vistaController.productosRegistrar);

module.exports = router;