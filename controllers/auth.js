const { response } = require('express');
const bcrypt = require("bcryptjs"); // encriptar clave
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
// const { getMenu } = require('../helpers/menu-frontend');

const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        // verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            res.status(404).json({
                ok: false,
                msg: 'Email o password son incorrectos'
            });
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);
        if (!validPassword) {
            res.status(400).json({
                ok: false,
                msg: 'Email o password son incorrectos'
            });
        }

        // generar token, ya que es correcto el login - JWT
        const token = await generarJWT( usuarioDB.id );

        res.status(200).json({
            ok: true,
            token,
            // retornamos el menú
            // menu: getMenu (usuarioDB.role)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado login, hable con administrador'
        });
    }
}

// renovación del token
const renweToken = async (req, res = response) => {

    const uid = req.uid;
    
    const token = await generarJWT( uid );
    const usuario = await Usuario.findById( uid );
    
    res.status(200).json({
        ok: true,
        token,
        usuario,
        // retornamos el menú
        // menu: getMenu (usuario.role)
    });
}

module.exports = { login, renweToken }
