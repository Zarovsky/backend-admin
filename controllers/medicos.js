
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

const actualizarMedico = async (req, res = response) => {
  
  const HospitalId = req.params.hospital;
  const uid = req.uid; // del usuario

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "El médico no existe",
      });
    }

    // esto es si solo fuese un campo
    // hospital.nombre = req.body.nombre;

    // si hubiesen varios campos
    const cambiosMedico = {
      ...req.body,
      usuario: uid,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      cambiosMedico,
      { new: true }
    ); // para que retorne el último actualizado

    res.json({
      ok: true,
      medico: medicoActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error faltal, contacte con adminsitrador",
    });
  }
};

const eliminarMedico = async (req, res = response) => {

  const id = req.params.id;

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({
        ok: false,
        msg: "El médico no existe",
      });
    }

    await Medico.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Médico eliminado"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error faltal, contacte con adminsitrador",
    });
  }
};

module.exports = { getMedicos, setMedico, actualizarMedico, eliminarMedico };
