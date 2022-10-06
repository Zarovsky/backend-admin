// busquedas totales

const { response } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");

const getDatos = async (req, res = response) => {
  const filtro = req.params.filtro;

  // creamos expresión regular 'insensible'
  const regex = new RegExp(filtro, "i");

  // buscamos primero usuarios. Ejecutamos a la vez
  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.status(200).json({
    ok: true,
    msg: "llego",
    filtro,
    usuarios,
    medicos,
    hospitales,
  });
};

const getDatosColeccion = async (req, res = response) => {
  const tabla = req.params.tabla;
  const filtro = req.params.filtro;

  // creamos expresión regular 'insensible'
  const regex = new RegExp(filtro, "i");

  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });
      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "Las tablas aceptadas son usuarios, medicos y hospitales",
      });
  }

  res.status(200).json({
    ok: true,
    resultados: data,
  });
};

module.exports = { getDatos, getDatosColeccion };
