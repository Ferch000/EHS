
const express = require('express');
const router = express.Router();
const capacitacionesController = require('../controllers/capacitacionesController');
console.log('Controller:', capacitacionesController);
const verificarToken = require('../middlewares/authMiddleware');
const { validarCapacitacion } = require('../middlewares/validacionesCapacitaciones');
const { validarCampos } = require('../middlewares/validarCampos');

router.post('/', validarCapacitacion, validarCampos, verificarToken, capacitacionesController.crear);
router.get('/', verificarToken, capacitacionesController.obtenerTodas);
router.get('/:id', verificarToken, capacitacionesController.obtenerUna);
router.put('/:id', validarCapacitacion, validarCampos, verificarToken, capacitacionesController.actualizar);
router.delete('/:id', verificarToken, capacitacionesController.eliminar);

module.exports = router;