
const certificadosModel = require('../models/certificadosModel');

exports.crear = async (req, res) => {
    try {
        const nuevo = await certificadosModel.crearCertificado(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        console.error('Error al crear certificado:', error);
        res.status(500).json({ error: 'Error al crear certificado' });
    }
};

exports.obtenerTodos = async (req, res) => {
    try {
        const lista = await certificadosModel.obtenerCertificados();
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener certificados' });
    }
};

exports.obtenerUno = async (req, res) => {
    try {
        const certificado = await certificadosModel.obtenerCertificadoPorId(req.params.id);
        res.json(certificado);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener certificado' });
    }
};

exports.actualizar = async (req, res) => {
    try {
        const actualizado = await certificadosModel.actualizarCertificado(req.params.id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar certificado' });
    }
};

exports.eliminar = async (req, res) => {
    try {
        const eliminado = await certificadosModel.eliminarCertificado(req.params.id);
        res.json(eliminado);
    } catch (error) {
        res.status(500). json ({ error: 'Error al eliminar certificado' });
    }
};