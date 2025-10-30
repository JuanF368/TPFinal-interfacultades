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

router.get('/partidos', async (req, res) => {
    try{
        const client = await soap.createClientAsync(soapUrl);

        const { iddisciplina, fecha, idfacultad } = req.query;
        const filtros = {};

        if(iddisciplina) filtros.iddisciplina = parseInt(iddisciplina);
        if(fecha) filtros.fecha = fecha;
        if(idfacultad) filtros.idfacultad = parseInt(idfacultad);

        const [result] = await client.getPartidosAsync({filtros});

        const partidos = JSON.parse(result.return);

        res.json(partidos);
    } catch (error) {
        console.error('Error en wrapper getPartidos:', error);
        res.status(500).json({ error: 'Error al llamar al servicio SOAP (getPartidos)' });
    }
});

router.put('/partidos/:id', async (req, res) => {
    try{
        const client = await soap.createClientAsync(soapUrl);
        const { resequipo1, resequipo2 } = req.body;

        const [result] = await client.actualizarResultadoAsync({
            idpartido: parseInt(req.params.id),
            resequipo1: parseInt(resequipo1),
            resequipo2: parseInt(resequipo2)
        });
        
        res.json({ msg: result.return });
    } catch (error) {
        console.error('Error en wrapper actualizarPartido:', error);
        res.status(500).json({ error: 'Error al llamar al servicio SOAP (actualizarPartido)' });
    }
});

module.exports = router;