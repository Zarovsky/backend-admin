const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, setUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarJWT, validarAdminRole } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta: /api/usuarios 
// traer usuarios
router.get('/',validarJWT, getUsuarios );

// crear usuario
router.post('/', [
    check('nombre','El usuario es obligatorio').not().isEmpty(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], setUsuario);

// actualizar usuario
router.put('/:id',
[
    validarJWT,
    validarAdminRole,
    check('nombre','El usuario es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),
    validarCampos
],
 actualizarUsuario);

 // eliminar usuario
 router.delete('/:id', [validarJWT, validarAdminRole], eliminarUsuario);

module.exports = router;