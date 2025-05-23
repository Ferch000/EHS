
const asistenciasModel = require('../models/asistenciasModel');
const ExcelJS = require('exceljs');

exports.registrarAsistencia = async (req, res) =>{
    try{
        const { numero_empleado, capacitacion_id, confirmado } = req.body;
        const nuevaAsistencia = await asistenciasModel.registrarAsistencia(
            numero_empleado, 
            capacitacion_id,
            confirmado 
        );
        res.status(201).json(nuevaAsistencia);
    } catch (error) {
        console.error('Error al registrar asistencia:', error.message);
        res.status(500).json({ error: error.message});
    }
};

exports.obtenerAsistencias = async (req, res) => {
    try {
        const filtros = {
            numero_empleado: req.query.numero_empleado,
            capacitacion_id: req.query.capacitacion_id,
            confirmado: req.query.confirmado
        };
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const asistencias = await asistenciasModel.obtenerAsistencias(filtros, page, limit);
        res.json(asistencias);
    } catch (error) {
        console.error('Error al obtener asistencias:', error.message);
        res.status(500).json({ error: 'Error al obtener asistencias' });
    }
};

exports.actualizarAsistencia = async (req, res) => {
    try {
        let { confirmado } = req.body;

        // Convertir "Sí"/"No" a booleano
        if (typeof confirmado === 'string') {
            confirmado = confirmado.toLowerCase() === 'sí' || confirmado.toLowerCase() === 'si';
        }
        const actualizada = await asistenciasModel.actualizarAsistencia(req.params.id, confirmado);
        res.json(actualizada);
    } catch (error) {
        console.error('Error al actualizar asistencia:', error.message);
        res.status(500).json({ error: 'Error al actualizar asistencia' });
    }
};

exports.eliminarAsistencia = async (req, res) => {
    try {
        const eliminada = await asistenciasModel.eliminarAsistencia(req.params.id);
        res.json(eliminada);
    } catch (error) {
        console.error('Error al eliminar asistencia:', error.message);
        res.status(500).json({ error: 'Error al eliminar asistencia' });
    }
};

exports.exportarAsistenciasExcel = async (req, res) => {
    try {
        const filtros = {
            numero_empleado: req.query.numero_empleado,
            capacitacion_id: req.query.capacitacion_id,
            confirmado: req.query.confirmado
        };

        //Obtener los registros sin paginación
        const asistencias = await asistenciasModel.obtenerAsistencias(filtros, null, null);

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Asistencias');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Nombre', key: 'nombre', width: 30 },
            { header: 'Apellido', key: 'apellido' },
            { header: 'Número Empleado', key: 'numero_empleado', width: 20 },
            { header: 'Capacitación', key: 'titulo', width: 30 },
            { header: 'Fecha de Asistencia', key: 'fecha_asistencia', width: 25},
            { header: 'Confirmado', key: 'confirmado', width: 15 },
        ];

        asistencias.forEach(asistencia => {
            worksheet.addRow(asistencia);
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename=asistencias.xlsx'
        );

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error al exportar asistencias a Excel:', error.message);
        res.status(500).json({ error: 'Error al generar el archivo Excel' });
    }
};