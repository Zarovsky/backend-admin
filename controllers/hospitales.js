
const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  res.status(200).json({
    ok: true,
    msg: "getHospitales",
  });
};

const setHospital = async (req, res = response) => {

  const hospital = new Hospital({
    usuario: uid,
    ...req.body}
    );
  // el uid del quien crea el hospital lo tenemos por pasarlo
  // en las cabecetas y pasar por la validación JWT
  const uid = req.uid;

  try {

    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Errro chungo, hable con el administrador",
    });
  }
};

const actualizarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "actualizarHospital",
  });
};

const eliminarHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "eliminarHospital",
  });
};

module.exports = {
  getHospitales,
  setHospital,
  actualizarHospital,
  eliminarHospital,
};

