const { Facultad } = require('../models');

const obtenerFacultades = async (req, res) => {
    try {
        const facultades = await Facultad.findAll();
        res.json(facultades);
    } catch (error) {
        console.error('Error al obtener facultades:', error);
        res.status(500).json({ error: 'Error al obtener facultades' });
    }
};

module.exports = { obtenerFacultades };