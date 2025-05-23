
const { body } = require('express-validator');

const validarAsistencia = [
    body ('numero_empleado')
      .notEmpty().withMessage('El número del empleado es obligatorio')
      .isInt().withMessage('El número del empleado debe ser un número'),

    body ('capacitacion_id')
      .notEmpty().withMessage('El ID de la capacitación es obligatorio')
      .isInt().withMessage('El ID de la capacitación debe ser un número'),

    body ('confirmado')
      .optional()
      .isBoolean().withMessage('El campo confirmado debe ser verdadero o falso (true o false)'),
];

module.exports = validarAsistencia;