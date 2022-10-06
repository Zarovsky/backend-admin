/*
api/upload/:tipo/:id
*/
const { Router } = require("express");

// hemos instalado express-fileupload
const expressfileUpload = require("express-fileupload");

const { fileUpload, retornarImagen } = require("../controllers/uploads");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.use(expressfileUpload());

router.put("/:tipo/:id", [validarJWT], fileUpload);

router.get("/:tipo/:foto", retornarImagen);

module.exports = router;
