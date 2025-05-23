
const express = require('express');
const router = express.Router();
const asistenciasController = require('../controllers/asistenciasController');
const validarAsistencia = require('../middlewares/validacionesAsistencias');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/', verificarToken, validarAsistencia, asistenciasController.registrarAsistencia);
router.get('/', verificarToken, asistenciasController.obtenerAsistencias);
router.get('/exportar-excel', verificarToken, asistenciasController.exportarAsistenciasExcel);
router.put('/:id', verificarToken, asistenciasController.actualizarAsistencia);
router.delete('/:id', verificarToken, asistenciasController.eliminarAsistencia);

module.exports = router;