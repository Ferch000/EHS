
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/login', authController.login);

//Ruta protegida que devuelve el perfil del usuario
router.get('/perfil', verificarToken, authController.perfil);

module.exports = router;