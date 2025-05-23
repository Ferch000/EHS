
const db = require('../db');

exports.registrarAsistencia = async (numero_empleado, capacitacion_id, confirmado = true) => {
    // Convertir "Sí"/"No" a booleano si es string
    if (typeof confirmado === 'string') {
        confirmado = confirmado.toLowerCase() === 'sí' || confirmado.toLowerCase() === 'si';
    }
    //Aqui se obtiene el id del empleado en base a su numero
    const resEmpleado = await db.query(
        'SELECT id FROM empleados WHERE numero_empleado = $1',
        [numero_empleado]
    );

    if (resEmpleado.rows.length === 0) {
        throw new Error('Empleado no encontrado');
    }

    const empleado_id = resEmpleado.rows[0].id;

    //Verificar si ya existe la asistencia para esa capacitación y empleado
    const asistenciaExistente = await db.query(
        'SELECT 1 FROM asistencias WHERE empleado_id = $1 AND capacitacion_id = $2',
        [empleado_id, capacitacion_id]
    );

    if (asistenciaExistente.rows.length > 0) {
        throw new Error('La asistencia ya fue registrada para este empleado en esta capacitacion');
    }

    const result = await db.query(
        `INSERT INTO asistencias (empleado_id, capacitacion_id, confirmado)
        VALUES ($1, $2, $3) RETURNING *`,
        [empleado_id, capacitacion_id, confirmado]
    );

    return result.rows[0];
};

exports.obtenerAsistencias = async (filtros = {}, page = 1, limit = 10 ) => {
    const condiciones = [];
    const valores = [];

    if (filtros.numero_empleado) {
        valores.push(filtros.numero_empleado);
        condiciones.push(`e.numero_empleado = $${valores.length}`);
    }
    
    if (filtros.capacitacion_id) {
        valores.push(filtros.capacitacion_id);
        condiciones.push(`c.id = $${valores.length}`);
    }

    if (filtros.confirmado) {
        const confirmadoBool = filtros.confirmado.toLowerCase() === 'sí' || filtros.confirmado.toLowerCase() === 'si';
        valores.push(confirmadoBool);
        condiciones.push(`a.confirmado = $${valores.length}`);
    }
    const where = condiciones.length > 0 ? `WHERE ${condiciones.join(' AND ')}` : '';

    const offset = (page - 1) * limit;
    valores.push(limit, offset);

    const result = await db.query (`
        SELECT a.id, e.nombre, e.apellido, e.numero_empleado, c.titulo, a.fecha_asistencia, 
             CASE WHEN a.confirmado THEN 'Sí' ELSE 'No' END AS confirmado
        FROM asistencias a
        JOIN empleados e ON a.empleado_id = e.id
        JOIN capacitaciones c ON a.capacitacion_id = c.id
        ${where}
        ORDER BY a.fecha_asistencia DESC
        LIMIT $${valores.length - 1} OFFSET $${valores.length}
        `, valores);
    
        return result.rows;
};

//Actualizar asistencia
exports.actualizarAsistencia = async (id, confirmado) => {
    const result = await db.query(
        `UPDATE asistencias
         SET confirmado = $1
         WHERE id = $2
         RETURNING *`,
         [confirmado, id]
    );
    return result.rows[0];
};

//Eliminar asistencia
exports.eliminarAsistencia = async (id) => {
    const result = await db.query(
        'DELETE FROM asistencias WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};
