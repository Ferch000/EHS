
const db = require('../db');

//Crear una nueva capacitación
exports.crearCapacitacion = async (data) => {
    const { titulo, descripcion, fecha, hora_inicio, hora_fin, lugar, obligatoria, responsable } = data;
    const result = await db.query(
        `INSERT INTO capacitaciones (titulo, descripcion, fecha, hora_inicio, hora_fin, lugar, obligatoria, responsable)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [titulo, descripcion, fecha, hora_inicio, hora_fin, lugar, obligatoria, responsable]
    );

    return result.rows[0];
};

//Obtener todas las capacitaciones
exports.obtenerCapacitaciones = async () => {
    const result = await db.query('SELECT * FROM capacitaciones ORDER BY fecha DESC');
    return result.rows;
};

//Obtener capacitación por ID
exports.obtenerCapacitacionPorId = async (id) => {
    const result = await db.query('SELECT * FROM capacitaciones WHERE id = $1', [id]);
    return result.rows[0];
};

//Actualizar capacitación
exports.actualizarCapacitacion = async (id, data) => {
    const { titulo, descripcion, fecha, hora_inicio, hora_fin, lugar, obligatoria, responsable} = data;
    const result = await db.query(
        `UPDATE capacitaciones
        SET titulo = $1, descripcion = $2, fecha = $3, hora_inicio = $4, hora_fin = $5,
            lugar = $6, obligatoria = $7, responsable = $8
        WHERE id = $9 RETURNING *`,
      [titulo, descripcion, fecha, hora_inicio, hora_fin, lugar, obligatoria, responsable, id]
    );
    return result.rows[0];
};

//Eliminar capacitación
exports.eliminarCapacitacion = async (id) => {
    const result = await db.query('DELETE FROM capacitaciones WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};