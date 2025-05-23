
const { body } = require('express-validator');

const validarCapacitacion = [
    body('titulo')
      .notEmpty().withMessage('El título es obligatorio')
      .isLength({ max: 200 }).withMessage('El título no debe superar los 200 caracteres'),

    body('descripcion')
      .optional(),

    body('fecha')
      .notEmpty().withMessage('La fecha es obligatoria')
      .isDate().withMessage('Debe ser una fecha válida (AAAA-MM-DD)'),

    body('hora_inicio')
      .optional()
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage('La hora de inicio debe ser válida (HH:MM)'),

    body('hora_fin')
      .optional()
      .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage('La hora de fin debe ser válida (HH:MM)'),

    body('lugar')
      .optional()
      .isLength({ max: 100 }).withMessage('El lugar no debe superar los 100 caracteres'),

    body('obligatoria')
      .optional()
      .custom((value) => {
        if (typeof value === 'boolean') return true;
        const val = value.toLowerCase();
        return val === 'si' || val === 'si' || val === 'no';
      }).withMessage('Obligatoria debe ser "si", "no"'),

    body('responsable')
      .optional()
      .isLength({ max: 100 }).withMessage('El nombre del responsable no debe superar los 100 caracteres')
];

module.exports = { validarCapacitacion };