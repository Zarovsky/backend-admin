/*
/api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getMedicos, setMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta: /api/usuarios 
// traer medicos
router.get('/', getMedicos );

// crear medico
router.post('/', [
    validarJWT,
    check('nombre', ' El nombre del médico es obligatorio').not().isEmpty(),
    check('hospital', ' El Id del hospital es obligatorio').isMongoId(),
    validarCampos
], setMedico);

// actualizar medico
router.put('/:id',
[  ],
 actualizarMedico);

 // eliminar medico
 router.delete('/:id', eliminarMedico);

module.exports = router;



