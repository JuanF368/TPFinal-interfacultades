const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

const { crearUsuario } = require('../controllers/registroController');
const { ping } = require('../controllers/pingController');
const { login }= require('../controllers/loginController');
const { publicaciones, crearPublicacion } = require('../controllers/publicacionesController');

router.get('/ping', ping);
router.post('/login', login);
router.post('/crearUsuario', crearUsuario);
router.get('/publicaciones', publicaciones), 
router.post('/crearPublicacion', upload.array('imagenes', 5), crearPublicacion); //upload para cant de img

module.exports = router;
