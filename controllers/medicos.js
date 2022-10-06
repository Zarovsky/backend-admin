
const { response } = require("express");
const Medico = require("../models/medicos");

const getMedicos = async (req, res = response) => {

  const medicos = await Medico.find()
                .populate('hospital', 'nombre')
                .populate('usuario','nombre img');

  res.status(200).json({
    ok: true,
    medicos
  });
};

const setMedico = async (req, res = response) => {
  // recupero el uid que se coge del token
  const uid = req.uid;

  const medico = new Medico({
    // añado el uid recuperado
    usuario: uid,
    ...req.body,
  });

  try {
    const medicoDB = await medico.save();

    res.status(200).json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error falta. Hable con el administrador",
    });
  }
};

const actualizarMedico = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "actualizarMedico",
  });
};

const eliminarMedico = (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "eliminarHospital",
  });
};

module.exports = { getMedicos, setMedico, actualizarMedico, eliminarMedico };
