
const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');
const verificarToken = require('../middlewares/authMiddleware');

router.use(verificarToken); //Protege todas las rutas de reportes

router.post('/', reportesController.crear);
router.get('/', reportesController.obtenerTodos);
router.get('/:id', reportesController.obtenerUno);
router.delete('/:id', reportesController.eliminar);

module.exports = router;