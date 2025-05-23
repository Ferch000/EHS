
const { body } = require('express-validator');

const validarUsuario = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio'),

    body('correo')
        .notEmpty().withMessage('El correo es obligatorio')
        .isEmail().withMessage('Debe ser un correo válido'),

    body('contrasena')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),

    body('rol')
        .notEmpty().withMessage('El rol es obligatorio')
        .isIn(['EHS', 'RH']).withMessage('El rol debe ser "EHS" o "RH"')
];

module.exports = validarUsuario;