const { response, json } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const validarJWT = (req, res = response, next) => {

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
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);

        // añadimos el uid verificado a la respuesta
        req.uid = uid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
}

// también validamos que sea el propio usuario
const validarAdminRole = async (req, res = response, next) => {
    // esto viene del validar token, que lo llamamos antes
    const uid = req.uid;
    // recuperamos el id de la url
    const id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        // si no existe el usuario salgo
        if (!usuarioDB)
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            });

        // si existe...
        if (usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        }
        else
        {
            return res.status(403).json({
                ok: false,
                msg: 'Acceso denegado'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}




module.exports = { validarJWT, validarAdminRole }