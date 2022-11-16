const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
// CORS
const cors = require('cors');
// para crear la ruta, viene de node
const path = required('path');


// crear o inicializa el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Carpeta pública donde desplegamos nuestra aplicación
// app.use(express.static('public'));

// lectura y parseo del body
app.use( express.json() );

// base de datos
dbConnection();

// Rutas
// esto siguiente está separado por si tenemos muchos
/*
app.get('/api/usuarios', (req, res) => {
    // si se hace esa solicitud ejecuta esto.
    res.json({
        ok: true,
        usuarios: [{
            id: 123,
            nombre: 'David'
        }]
    })
});
*/
// uso un middlewave
app.use('/api/usuarios' , require('./routes/usuarios'));
app.use('/api/hospitales' , require('./routes/hospitales'));
app.use('/api/medicos' , require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/buscar', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

// si no es ninguna de esas rutas
app.get('*',(req, res) => {
    res.sendFile( path.resolve(__dirname, 'public/index.html'));
});


// para levantarlo
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo');
})


