const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const verificarToken = require('../middlewares/verificarToken');
const verificarRol = require('../middlewares/verificarRol'); 

const { crearUsuario } = require('../controllers/registroController');
const { ping } = require('../controllers/pingController');
const { login }= require('../controllers/loginController');
const { publicaciones, crearPublicacion } = require('../controllers/publicacionesController');
const { obtenerDisciplinas } = require('../controllers/disciplinasController');
const { perfilUsuario, editarPerfil, publicacionesUsuario, eliminarPublicacion, editarPublicacion } = require('../controllers/perfilController'); 
const { obtenerGaleria, subirFoto } = require('../controllers/galeriaController');
const { obtenerResultados, actualizarResultados } = require('../controllers/partidocontroller');
const convocatoriaRoutes = require('./convocatoriaRoutes'); 
const { obtenerFacultades } = require('../controllers/facultadesController');
const { listarUsuarios, actualizarRolUsuario} = require('../controllers/usuariosController'); 

router.get('/ping', ping);
router.post('/login', login);
router.post('/crearUsuario', crearUsuario);
router.get('/publicaciones', publicaciones);
router.post('/crearPublicacion', verificarToken, upload.array('imagenes', 5), crearPublicacion); //upload para cant de img
router.get('/disciplina', obtenerDisciplinas);
router.get('/perfil', verificarToken, perfilUsuario); 
router.put('/perfil/editar', verificarToken, editarPerfil); 
router.get('/perfil/publicaciones', verificarToken, publicacionesUsuario); 
router.delete('/perfil/publicaciones/:id', verificarToken, eliminarPublicacion); 
router.put('/perfil/publicaciones/:id', verificarToken,  upload.array('imagenes', 5), editarPublicacion);
router.get('/galeria', obtenerGaleria);
router.post('/galeria', verificarToken, upload.single('imagen'), subirFoto); //upload.single para 1 sola img
router.get('/resultados', obtenerResultados);
router.put('/resultados/:id', verificarToken, actualizarResultados);
router.get('/usuarios', verificarToken, verificarRol(['admin', 'profesor']), listarUsuarios);
router.put('/usuarios/actualizar/:id', verificarToken,  verificarRol(['admin', 'profesor']), actualizarRolUsuario); 

router.use('/convocatoria',verificarToken, verificarRol(['admin']), convocatoriaRoutes); 
router.get('/facultades', obtenerFacultades);

module.exports = router;
