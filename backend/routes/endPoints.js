const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const verificarToken = require('../middlewares/verificarToken');

const { crearUsuario } = require('../controllers/registroController');
const { ping } = require('../controllers/pingController');
const { login }= require('../controllers/loginController');
const { publicaciones, crearPublicacion } = require('../controllers/publicacionesController');
const { obtenerDisciplinas } = require('../controllers/disciplinasController');

router.get('/ping', ping);
router.post('/login', login);
router.post('/crearUsuario', crearUsuario);
router.get('/publicaciones', publicaciones);
router.post('/crearPublicacion', verificarToken, upload.array('imagenes', 5), crearPublicacion); //upload para cant de img
router.get('/disciplina', obtenerDisciplinas);

module.exports = router;
