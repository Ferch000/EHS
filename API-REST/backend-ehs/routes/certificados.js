
const express = require('express');
const router = express.Router();
const certificadosController = require('../controllers/certificadosController');
const verificarToken = require('../middlewares/authMiddleware');

router.use(verificarToken); //Protege todas las rutas de certificados

router.post('/', certificadosController.crear);
router.get('/', certificadosController.obtenerTodos);
router.get('/:id', certificadosController.obtenerUno);
router.put('/:id', certificadosController.actualizar);
router.delete('/:id', certificadosController.eliminar);

module.exports = router;