
const db = require('../db');

//Crear un nuevo reportes
exports.crearReporte = async (data) => {
    const { usuario_id, tipo_reporte, parametros, archivo_pdf } = data;
    const result = await db.query(
        `INSERT INTO reportes (usuario_id, tipo_reporte, parametros, archivo_pdf)
         VALUES ($1, $2, $3, $4) RETURNING *`,
         [usuario_id, tipo_reporte, parametros, archivo_pdf]
    );
    return result.rows[0];
};

//Obtener todos los reportes
exports.obtenerReportes = async () => {
    const result = await db.query(
        `SELECT r.*, u.nombre AS nombre_usuario
         FROM reportes r
         LEFT JOIN usuarios u ON r.usuario_id = u.id
         ORDER BY r.fecha_generacion DESC`
    );
    return result.rows;
};

//Obtener un reporte por ID
exports.obtenerReportePorId = async (id) => {
    const result = await db.query(`SELECT * FROM reportes WHERE id = $1`, [id]);
    return result.rows[0];
};

//Eliminar reporte
exports.eliminarReporte = async (id) => {
    const result = await db.query('DELETE FROM reportes WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};