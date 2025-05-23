
const express = require('express');
const router = express.Router();
const empleadosController = require('../controllers/empleadosController');
const verificarToken = require('../middlewares/authMiddleware');
const validarEmpleado = require('../middlewares/validacionesEmpleados');
const { validarCampos } = require('../middlewares/validarCampos');

router.use(verificarToken); //Protege todas las rutas de empleados

router.post('/', validarEmpleado, validarCampos, empleadosController.crear);
router.get('/', empleadosController.obtenerTodos);
router.get('/:id', empleadosController.obtenerUno);
router.put('/:id', validarEmpleado, validarCampos, empleadosController.actualizar);
router.delete('/:id', empleadosController.eliminar);

module.exports = router;