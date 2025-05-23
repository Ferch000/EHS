
const empleadosModel = require('../models/empleadosModel');

exports.crear = async (req, res) => {
  try {
    const empleado = await empleadosModel.crearEmpleado(req.body);
    res.status(201).json(empleado);
  } catch (error) {
    console.error('Error al crear empleado:', error);
    res.status(500).json({ error: 'Error al crear empleado' });
  }
};

exports.obtenerTodos = async (req, res) => {
  try {
    const empleados = await empleadosModel.obtenerEmpleados();
    res.json(empleados);
  } catch (error) {
    res.status(500).json ({ error: 'Error al obtener empleados' });
  }
};

exports.obtenerUno = async (req, res) => {
  try {
    const empleado = await empleadosModel.obtenerEmpleadoPorId(req.params.id);
    res.json(empleado);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empleado' });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const actualizado = await empleadosModel.actualizarEmpleado(req.params.id, req.body);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar empleado' });
  }
};

exports.eliminar = async (req, res) => {
  try {
    const eliminado = await empleadosModel.eliminarEmpleado(req.params.id);
    res.json(eliminado);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
};












