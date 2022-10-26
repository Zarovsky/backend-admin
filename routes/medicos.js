/*
/api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, setMedico, actualizarMedico, eliminarMedico, getMedicoById } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta: /api/usuarios 
// traer medicos
router.get('/', validarJWT, getMedicos );

// crear medico
router.post('/', [
    validarJWT,
    check('nombre', ' El nombre del médico es obligatorio').not().isEmpty(),
    check('hospital', ' El Id del hospital debe ser válido').isMongoId(),
    validarCampos
], setMedico);

// actualizar medico
router.put('/:id',
[ 
    validarJWT,
    check('nombre', ' El nombre del médico es obligatorio').not().isEmpty(),
    check('hospital', ' El Id del hospital debe ser válido').isMongoId(),
    validarCampos
 ],
 actualizarMedico);

 // eliminar medico
 router.delete('/:id',  validarJWT, eliminarMedico);

 // recuperar un médico en particular
 router.get('/:id',  validarJWT, getMedicoById);

module.exports = router;



