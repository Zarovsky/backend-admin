const { response } = require('express');
const bcrypt = require("bcryptjs"); // encriptar clave
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

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
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado login, hable con administrador'
        });
    }
}

module.exports = { login }
