const express = require('express');
const router = express.Router();
const { crearConvocatoria, editarConvocatoria, estadoConvocatoria } = require('../controllers/convocatoriaController');

router.post('/crearConvocatoria', crearConvocatoria);
router.put('/editarConvocatoria/:id', editarConvocatoria);
router.get('/estado', estadoConvocatoria);

module.exports = router;