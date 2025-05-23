
const pool = require('../config/database');

const getUsuarios = async () => {
    const res = await pool.query('SELECT id, nombre, correo, rol FROM usuarios');
    return res.rows;
};

const crearUsuario = async (nombre, correo, contrasena, rol) => {
    const res = await pool.query(
        'INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, correo, contrasena, rol]
    );
    return res.rows[0];
};

const buscarPorCorreo = async (correo) => {
    const res = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    return res.rows[0];
};

module.exports = {
    getUsuarios,
    crearUsuario,
    buscarPorCorreo
};