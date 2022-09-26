const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, setUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Ruta: /api/usuarios 
// traer usuarios
router.get('/', validarJWT, getUsuarios );

// crear usuario
router.post('/', [
    check('nombre','El usuario es obligatorio').not().isEmpty(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmail(),
    validarCampos
], setUsuario);

// actualizar usuario
router.put('/:id',
[   validarJWT,
    check('nombre','El usuario es obligatorio').not().isEmpty(),
    check('role', 'La password es obligatoria').not().isEmpty(),
    check('email', 'El role es obligatorio').not().isEmail(),
    validarCampos

],
 actualizarusuario);

 // eliminar usuario
 router.delete('/:id', validarJWT, eliminarUsuario);

module.exports = router;