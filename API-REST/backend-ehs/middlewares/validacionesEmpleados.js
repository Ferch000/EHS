
const { body } = require('express-validator');

const validarEmpleado = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),

    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),

    body('numero_empleado')
      .notEmpty().withMessage('El número de empleado es obligatorio')
      .isLength({ min: 3}).withMessage('Debe tener al menos 3 caracteres'),

    body('departamento')
      .notEmpty().withMessage('El departamento es obligatorio')
      .isLength({ max: 100 }).withMessage('Máximo 100 caracteres'),

    body('puesto')
      .notEmpty().withMessage('El puesto es obligatorio')
      .isLength({ max:100 }).withMessage('Máximo 100 caracteres'),
      
];

module.exports = validarEmpleado;