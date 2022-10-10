const { Router } = require('express');
const { login, renweToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// path: '/api/login'
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
], login)

// regenerar el token si existe
router.get('/renew', validarJWT, renweToken)


module.exports = router;
