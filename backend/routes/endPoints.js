const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const verificarToken = require('../middlewares/verificarToken');

const { crearUsuario } = require('../controllers/registroController');
const { ping } = require('../controllers/pingController');
const { login }= require('../controllers/loginController');
const { publicaciones, crearPublicacion } = require('../controllers/publicacionesController');
const { obtenerDisciplinas } = require('../controllers/disciplinasController');
const { publicacionesUsuario, eliminarPublicacion, editarPublicacion } = require('../controllers/perfilController'); 
const { obtenerGaleria, subirFoto } = require('../controllers/galeriaController');

router.get('/ping', ping);
router.post('/login', login);
router.post('/crearUsuario', crearUsuario);
router.get('/publicaciones', publicaciones);
router.post('/crearPublicacion', verificarToken, upload.array('imagenes', 5), crearPublicacion); //upload para cant de img
router.get('/disciplina', obtenerDisciplinas);
router.get('/perfil/publicaciones', verificarToken, publicacionesUsuario); 
router.delete('/perfil/publicaciones/:id', verificarToken, eliminarPublicacion); 
router.put('/perfil/publicaciones/:id', verificarToken, editarPublicacion);
router.get('/galeria', obtenerGaleria);
router.post('/galeria', verificarToken, upload.single('imagen'), subirFoto); //upload.single para 1 sola img

module.exports = router;
