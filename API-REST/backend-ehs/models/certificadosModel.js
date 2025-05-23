
const db = require('../db');

//Crear certificado
exports.crearCertificado = async (data) => {
    const { empleado_id, capacitacion_id, folio, archivo_pdf } = data;
    const result = await db.query(
        `INSERT INTO certificados (empleado_id, capacitacion_id, folio, archivo_pdf)
         VALUES ($1, $2, $3, $4) RETURNING *`,
         [empleado_id, capacitacion_id, folio, archivo_pdf]
    );
    return result.rows[0];
};

//Obtener todos los certificados
exports.obtenerCertificados = async () => {
    const result = await db.query(
        `SELECT c.*, e.nombre || ' ' || e.apellido AS empleado_nombre,
                cap.titulo AS nombre_capacitacion
         FROM certificados c
         JOIN empleados e ON c.empleado_id = e.id
         JOIN capacitaciones cap ON c.capacitacion_id = cap.id
         ORDER BY c.fecha_emision DESC`
    );
    return result.rows;
};

//Obtener certificado por ID
exports.obtenerCertificadoPorId = async (id) => {
    const result = await db.query('SELECT * FROM certificados WHERE id = $1', [id]);
    return result.rows[0]
};

//Actualizar certificado
exports.actualizarCertificado = async (id, data) => {
    const { empleado_id, capacitacion_id, folio, archivo_pdf } = data;
    const result = await db.query(
        `UPDATE certificados SET empleado_id = $1, capacitacion_id = $2, folio = $3, archivo_pdf = $4
         WHERE id = $5 RETURNING *`,
         [empleado_id, capacitacion_id, folio, archivo_pdf]
    );
    return result.rows[0];
};

//Eliminar certificado
exports.eliminarCertificado = async (id) => {
    const result = await db.query('DELETE FROM certificados WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};