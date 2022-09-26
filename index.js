const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
// CORS
const cors = require('cors');


// crear o inicializa el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

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
app.use('/api/login', require('./routes/auth'));


// para levantarlo
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo');
})


