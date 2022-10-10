const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res = response) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre img");
  // populate es para traer más cosas

  res.status(200).json({
    ok: true,
    hospitales,
  });
};

const setHospital = async (req, res = response) => {
  // el uid del quien crea el hospital lo tenemos por pasarlo
  // en las cabecetas y pasar por la validación JWT
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Errro chungo, hable con el administrador",
    });
  }
};

const actualizarHospital = async (req, res = response) => {
  const id = req.params.id;
  const uid = req.uid; // del usuario

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "hospital no encontrado",
      });
    }

    // esto es si solo fuese un campo
    // hospital.nombre = req.body.nombre;

    // si hubiesen varios campos
    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    ); // para que retorne el último actualizado

    res.json({
      ok: true,
      hospital: hospitalActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error faltal, contacte con adminsitrador",
    });
  }
};

const eliminarHospital = async (req, res = response) => {

  const id = req.params.id;

  try {
    const hospital = await Hospital.findById(id);

    if (!hospital) {
      return res.status(404).json({
        ok: false,
        msg: "hospital no encontrado",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital eliminado"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error faltal, contacte con adminsitrador",
    });
  }
};

module.exports = {
  getHospitales,
  setHospital,
  actualizarHospital,
  eliminarHospital,
};
