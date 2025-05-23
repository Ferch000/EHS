
const reportesModel = require('../models/reportesModel');

exports.crear = async (req, res) => {
    try {
        const nuevoReporte = await reportesModel.crearReporte(req.body);
        res.status(201).json(nuevoReporte);
    } catch (error) {
        console.error('Error al crear reporte:', error);
        res.status(500).json({ error: 'Error al crear reporte' });
    }
};

exports.obtenerTodos = async (req, res) => {
    try {
        const lista = await reportesModel.obtenerReportes();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener reportes' });
    }
};

exports.obtenerUno = async (req, res) => {
    try {
        const reporte = await reportesModel.obtenerReportePorId(req.params.id);
        res.json(reporte);
    } catch (error) {
        console.error('Error al obtener el reporte:', error);
        res.status(500).json({ error: 'Error al obtener el reporte' });
    }
};

exports.eliminar = async (req, res) => {
    try {
        const eliminado = await reportesModel.eliminarReporte(req.params.id);
        res.json(eliminado);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el reporte' });
    }
};