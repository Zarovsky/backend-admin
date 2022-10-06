/*
api/buscar/:filtro
*/
const { Router } = require('express');
const { getDatos, getDatosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:filtro', 
[
    validarJWT
],
getDatos );

router.get('/coleccion/:tabla/:filtro', 
[
    validarJWT
],
getDatosColeccion );


module.exports = router;
