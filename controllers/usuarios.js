const { response } = require("express");
const bcrypt = require("bcryptjs"); // encriptar clave
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

// listar usuarios
const getUsuarios = async(req, res) => {
  // Esto es el cuerpo de lo que se ejecuta en la petición
  // routes/usuarios.js
  const usuarios = await Usuario.find({}, "nombre email role google");

  res.json({
    ok: true,
    usuarios
    // uid: req.uid
  });
}

// crear usuario
const setUsuario = async (req, res = response) => {
  const { password, email } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }

    const usuario = new Usuario(req.body);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    // grabar BBDD
    await usuario.save();

    // generamos un token - JWT
    const token = await generarJWT(usuario.id);

    // Esto es el cuerpo de lo que se ejecuta en la petición
    // routes/usuarios.js
    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error chungo, revisar logs",
    });
  }
}

// actualizar usuario
const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;
  // const {nombre, email} = req.body;

  try {
    const usuarioDB = await Usuario.findById(uid);
    // si no existe el usuario
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario especificado",
      });
    }

    // si llego aquí, el usuario existe
    // validamos el token

    // actualizamos el usuario
    // extraemos por un lado password, google y email
    // y por otro el resto de campos
    const { password, google, email, ...campos } = req.body;

    // si no actualiza el email, tampoco lo grabamos
    if (usuarioDB.email !== email) {
      // debemos ver si existe el nuevo email.
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    // si cambia el email, se lo volvemos a añadir a los campos
    campos.email = email;

    // actualizamos y nos trae el nuevo
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      usuario: usuarioActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado actualizando usuario",
    });
  }
};

// eliminar usuario
const eliminarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDB = await Usuario.findById(uid);
    // si no existe el usuario
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario especificado",
      });
    }

    // lo eliminamos
    await Usuario.findByIdAndDelete(uid);

    res.status(200).json({
      ok: true,
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado eliminando usuario",
    });
  }
};

module.exports = {
  getUsuarios,
  setUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
