
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuariosModel');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getUsuarios();
        res.json (usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener usuarios'});
    }
};

const crearUsuario = async (req, res) => {
    const {nombre, correo, contrasena, rol} = req.body;
    try {
        //Validar rol permitido
        if (!['EHS', 'RH'].includes(rol)){
            return res.status(400).json({ error: 'Rol inválido' });
        }

        //Encriptar contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 8);

        const nuevoUsuario = await Usuario.crearUsuario(nombre, correo, hashedPassword, rol.toUpperCase());
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        console.error('Error al crear usuario:', err);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
};

module.exports = {
    obtenerUsuarios,
    crearUsuario
};