const fs = require("fs");

const Usuario = require("../models/usuario");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospital");

const borrarImagen = (path) => {
  // si existe la borramos
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);
      if (!medico) return false;

      // vemos si existe antigua imagen
      borrarImagen( `./uploads/medicos/${medico.img}`);

      medico.img = nombreArchivo;
      await medico.save();
      return true;
    // no hace falta break

    case "usuarios":
        const usuario = await Usuario.findById(id);
        if (!usuario) return false;
  
        // vemos si existe antigua imagen
        borrarImagen( `./uploads/usuarios/${usuario.img}`);
  
        usuario.img = nombreArchivo;
        await usuario.save();
        return true;
      // no hace falta break

    case "hospitales":
        const hospital = await Hospital.findById(id);
        if (!hospital) return false;
  
        // vemos si existe antigua imagen
        borrarImagen( `./uploads/hospitales/${hospital.img}`);
  
        hospital.img = nombreArchivo;
        await hospital.save();
        return true;
      // no hace falta break
      break;
  }
};

module.exports = { actualizarImagen };
