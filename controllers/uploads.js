const path = require('path'); // para recuperar imagen
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid'); // uuid
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar tipos
    const tiposValidos = ['hospitales', 'usuarios', 'medicos'];
    if (!tiposValidos.includes(tipo))
    {
        return res.status(400).json(
            {
                ok: false,
                msg: 'El tipo no es un médico, usuario u hospital'
            }
        );
    }

    // tirando del express-fileupload
    // validarque exista archivo
    if (!req.files || Object.keys(req.files).length === 0)
    {
        return res.status(400).json( {
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }


    // procesamos la imagen (imagen es el nombre que le hayamos puesto en la cabecera de la petición)
    const file = req.files.imagen;

    // extraer la extensión
    const nombreCortado = file.name.split('.');
    const extension = nombreCortado[nombreCortado.length - 1];

    // validamos extensión
    const extensionesValidas = ['png','gif','jpg'];
    if (!extensionesValidas.includes( extension.toLowerCase()))
    {
        return res.status(400).json( {
            ok: false,
            msg: 'La extensión no es admitido (png, jpg, gif)'
        });
    }

    // generar el nombre del archivo
    // en los casos que querramos un identificador unico para
    // las imágenes, instalamos npm i uuid
    // https://www.npmjs.com/package/uuid
    const nombreArchivo = `${ uuidv4() }.${ extension }`;
    
    // Path para guardar la imagen
    const path = `./uploads/${ tipo}/${ nombreArchivo}`;

    // Movemos la imagen
    file.mv( path, (err) => {
        if (err)
        {   
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error cargando la imagen'
            });
        }

        // Actualizar la BBDD para referenciar la imagen
        // creado middleware en helpers
        actualizarImagen(tipo, id, nombreArchivo);

        res.status(200).json({
            ok: true,
            msg: 'Archivo cargado correctamente',
            nombreArchivo
        });
    });
}

const retornarImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    let pathFile = path.join(__dirname, `../uploads/${ tipo }/${ foto}`);
    // si no existe ponemos una por defecto
    if (!fs.existsSync(pathFile))
    {
        pathFile = path.join(__dirname, `../uploads/no-image.gif`);
    }
    res.sendFile(pathFile);
    
}

module.exports = { fileUpload, retornarImagen }