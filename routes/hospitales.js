/*
/api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { getHospitales, setHospital, eliminarHospital, actualizarHospital } = require('../controllers/hospitales');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta: /api/usuarios 
// traer hospital
router.get('/', getHospitales );

// crear hospitales
router.post('/', [
    validarJWT,
    check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], setHospital);

// actualizar hospital
router.put('/:id',
[ 
    validarJWT,
    check('nombre','El nombre del hospital es obligatorio').not().isEmpty(),
    validarCampos
 ],
 actualizarHospital);

 // eliminar hospital
 router.delete('/:id', 
 validarJWT,
 eliminarHospital);

module.exports = router;


