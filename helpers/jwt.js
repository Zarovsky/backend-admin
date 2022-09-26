const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    // vamos a convertir el callback del sign en una promesa
    // para poder usar el await
    return new Promise( (resolve, reject) => {
            // sign es para crearlo
    // const payload = uid
    const payload = {
        uid
    }
    // la firma, los datos (que no sean sensibles)
    // la secret key
    // el err y token es porque es un callback (no asíncrono)
    jwt.sign(payload, process.env.JWT_SECRET,
        { expiresIn: '12h' }, (err, token) => {
            // el token es lo que nos interesa
            if (err) {
                console.log(err);
                // al ser una promesa ponemos el reject como que fue mal
                reject('No se pudo generar el JWT' );
            } else {
                resolve (token );
            }
        });
    });
}


module.exports = { generarJWT }
