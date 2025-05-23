
const capacitacionesModel = require('../models/capacitacionesModel');

const normalizarObligatoria = ( data ) => {
    if (typeof data.obligatoria === 'string') {
        const val = data.obligatoria.toLowerCase();
        data.obligatoria = (val === 'si' || val === 'si');
    }
}

exports.crear = async (req, res) => {
    try {
        const data = req.body;
        normalizarObligatoria(data);

        const capacitacion = await capacitacionesModel.crearCapacitacion(data);
        res.status(201).json(capacitacion);
    } catch (error) {
      console.error('Error al crear capacitacion:', error);
      res.status(500).json({ error: 'Error al crear capacitación' });
    } 
};

exports.obtenerTodas = async (req, res) => {
    try {
        const capacitaciones = await capacitacionesModel.obtenerCapacitaciones();
        res.json(capacitaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener capacitaciones' });
    }
};

exports.obtenerUna = async (req, res) => {
    try {
        const capacitacion = await capacitacionesModel.obtenerCapacitacionPorId(req.params.id);
        res.json(capacitacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la capacitación' });
    }
};

exports.actualizar = async (req, res) => {
    try {
        const data = req.body;
        normalizarObligatoria(data);

        const actualizada = await capacitacionesModel.actualizarCapacitacion(req.params.id, req.body);
        res.json(actualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar capacitación' });
    }
};

exports.eliminar = async (req, res) => {
    try {
        const eliminada = await capacitacionesModel.eliminarCapacitacion(req.params.id);
        res.json(eliminada);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar capacitación' });
    }
    
};