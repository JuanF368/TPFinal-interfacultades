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

router.get('/disciplinas', async (req, res) => {
    try{
        const client = await soap.createClientAsync(soapUrl);
        const [result] = await client.getDisciplinasAsync({});
        res.json(result);
    } catch (error) {
        console.error('Error en wrapper getDisciplinas:', error);
        res.status(500).json({ error: 'Error al llamar al servicio SOAP (getDisciplinas)' });
    }
})

module.exports = router;