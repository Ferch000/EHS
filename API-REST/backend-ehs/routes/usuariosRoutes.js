
const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const verificarToken = require('../middlewares/authMiddleware');
const validarUsuario = require('../middlewares/validacionesUsuarios');
const { validarCampos } = require('../middlewares/validarCampos');

//Rutas protegidas
router.get('/', verificarToken, usuariosController.obtenerUsuarios);
router.post('/', validarUsuario, validarCampos, usuariosController.crearUsuario);

module.exports = router;