const express = require('express');
const router = express.Router();

const { crearUsuario } = require('../controllers/registroController');
const { ping } = require('../controllers/pingController');
const { login }= require('../controllers/loginController');

router.get('/ping', ping);
router.post('/login', login);
router.post('/crearUsuario', crearUsuario);

module.exports = router;
