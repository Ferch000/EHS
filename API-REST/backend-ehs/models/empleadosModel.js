
const db = require('../db');

//Crear nuevo empleado
exports.crearEmpleado = async (data) => {
  const { nombre, apellido, numero_empleado, departamento, puesto, codigo_qr } = data;
  const result = await db.query(
    `INSERT INTO empleados (nombre, apellido, numero_empleado, departamento, puesto, codigo_qr)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nombre, apellido, numero_empleado, departamento, puesto, codigo_qr]
  );
  return result.rows[0];
};

//Obtener todos los empleados
exports.obtenerEmpleados = async () => {
  const result = await db.query('SELECT * FROM empleados ORDER BY fecha_registro DESC');
  return result.rows;
};

//Obtener empleados por ID
exports.obtenerEmpleadoPorId = async (id) => {
  const result = await db.query('SELECT * FROM empleados WHERE id = $1', [id]);
  return result.rows[0];
};

//Actualizar empleados
exports.actualizarEmpleado = async (id, data) => {
  const { nombre, apellido, numero_empleado, departamento, puesto, codigo_qr } = data;
  const result = await db.query(
    `UPDATE empleados SET nombre = $1, apellido = $2, numero_empleado = $3,
     departamento = $4, puesto = $5, codigo_qr = $6 WHERE id = $7 RETURNING*`,
    [nombre, apellido, numero_empleado, departamento, puesto, codigo_qr, id] 
  );
  return result.rows[0];
};

//Eliminar empleado
exports.eliminarEmpleado = async (id) => {
  const result = await db.query('DELETE FROM empleados WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};