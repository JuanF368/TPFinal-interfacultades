const express = require('express');
const fs = require('fs');
const soap = require('soap');
const path = require('path');
const http = require('http');
const facultadService = require('./facultadService');
const db = require('../models');

const app = express();
const server = http.createServer(app);
const wsdlPath = path.join(__dirname, 'facultades.wsdl');
const xml = fs.readFileSync(wsdlPath, 'utf8');

app.get('/', (req, res) => res.send('Servicio SOAP de Facultades activo'));

server.listen(8000, async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Conexión a la BD para SOAP establecida');
        soap.listen(server, '/wsdl', facultadService, xml);
        console.log('Servidor SOAP corriendo en http://localhost:8000/wsdl?wsdl');
    } catch (error) {
        console.error('Error al conectar BD desde SOAP:', error);
    }
});