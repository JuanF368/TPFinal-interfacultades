const express = require('express');
const router = express.Router();
const { crearConvocatoria, editarConvocatoria, estadoConvocatoria } = require('../controllers/convocatoriaController');
const verificarToken = require('../middlewares/verificarToken');
const verificarRol = require('../middlewares/verificarRol');  

router.post('/crearConvocatoria',verificarToken, verificarRol(['administrador']), crearConvocatoria);
router.put('/editarConvocatoria/:id',verificarToken, verificarRol(['administrador']), editarConvocatoria);
router.get('/estado', estadoConvocatoria);

module.exports = router;