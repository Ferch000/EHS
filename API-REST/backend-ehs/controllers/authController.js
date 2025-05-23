
const Usuario = require('../models/usuariosModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'clave-secreta';

const login = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const usuario = await Usuario.buscarPorCorreo(correo);
       

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rol: usuario.rol},
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ mensaje: 'Autenticación exitosa', token });
    } catch (err) {
        res.status(500).json({ error: 'Error en login' });
    }
};

const perfil = (req, res) => {
    //req.usuario viene del middleware que decodifica el token
    res.json({
        mensaje: 'Perfil del usuario',
        usuario: req.usuario
    });
};

module.exports = {
    login,
    perfil
};