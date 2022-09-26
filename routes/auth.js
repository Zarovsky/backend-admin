const { Router } = require('express');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// path: '/api/login'
router.post('/' , [
    check('email', 'El email es obligatorio').not().isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
], login);


module.exports = router;