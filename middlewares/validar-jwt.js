const {response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next ) => {

    // Leer el token de la cabecera
    // llamado x-header o como le hayamos puesto
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        // comprobar si coincide con la firma
        // si no coincide lanza el catch
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        // añadimos el uid verificado a la respuesta
        req.uid = uid;
        next();

    } catch(error) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

   
}


module.exports = { validarJWT }