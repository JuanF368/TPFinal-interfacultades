const express = require('express');
const router = express.Router();
const soap = require('soap');

const soapUrl = 'http://localhost:8000/wsdl?wsdl';

router.get('/facultades', async (req, res) => {
    try{
        const client = await soap.createClientAsync(soapUrl);
        const [result] = await client.getFacultadesAsync({});
        res.json(result);
    } catch (error) {
        console.error('Error en wrapper getFacultades:', error);
        res.status(500).json({ error: 'Error al llamar al servicio SOAP (getFacultades)' });
    }
});

module.exports = router;