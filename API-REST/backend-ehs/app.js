
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//Rutas
const usuariosRoutes = require('./routes/usuariosRoutes');
app.use('/api/usuarios', usuariosRoutes);

const empleadosRoutes = require('./routes/empleados');
app.use('/api/empleados', empleadosRoutes);

const asistenciasRoutes = require('./routes/asistencias');
app.use('/api/asistencias', asistenciasRoutes);

const capacitacionesRoutes = require('./routes/capacitaciones');
app.use('/api/capacitaciones', capacitacionesRoutes);

const certificadosRoutes = require('./routes/certificados');
app.use('/api/certificados', certificadosRoutes);

const reportesRoutes = require('./routes/reportes');
app.use('/api/reportes', reportesRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

//Prueba
app.get('/', (req, res) => {
    res.send('API EHS funcionando');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});