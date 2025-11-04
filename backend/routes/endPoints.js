const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const verificarToken = require('../middlewares/verificarToken');
const verificarRol = require('../middlewares/verificarRol'); 

const { crearUsuario } = require('../controllers/registroController');
const { ping } = require('../controllers/pingController');
const { login }= require('../controllers/loginController');
const { publicaciones, crearPublicacion } = require('../controllers/publicacionesController');
const { obtenerDisciplinas, /*actualizarDisciplina */ } = require('../controllers/disciplinasController');
const { perfilUsuario, editarPerfil, publicacionesUsuario, eliminarPublicacion, editarPublicacion } = require('../controllers/perfilController'); 
const { obtenerGaleria, subirFoto } = require('../controllers/galeriaController');
const { obtenerResultados, actualizarResultados, actualizarEstado, crearPartido } = require('../controllers/partidocontroller');
const convocatoriaRoutes = require('./convocatoriaRoutes'); 
const { obtenerFacultades } = require('../controllers/facultadesController');
const { listarUsuarios, actualizarRolUsuario} = require('../controllers/usuariosController'); 
const { obtenerEquipos } = require('../controllers/equipoController');

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
router.put('/resultados/:id', verificarToken, verificarRol(['profesor']), actualizarResultados);
router.get('/usuarios', verificarToken, verificarRol(['administrador', 'profesor']), listarUsuarios);
router.put('/usuarios/actualizar/:id', verificarToken,  verificarRol(['administrador', 'profesor']), actualizarRolUsuario); 
//router.put('/disciplina/:id', verificarToken, verificarRol(['administrador', 'profesor']), actualizarDisciplina)
router.put('/resultados/estado/:id', verificarToken, verificarRol(['profesor']), actualizarEstado);
router.post('/resultados', verificarToken, verificarRol(['profesor']), crearPartido);
router.get('/equipos', obtenerEquipos);

router.use('/convocatoria',verificarToken, verificarRol(['administrador']), convocatoriaRoutes); 
router.get('/facultades', obtenerFacultades);

module.exports = router;
