const { Equipo, Facultad } = require('../models');

const obtenerEquipos = async (req, res) => {
    try {
        const equipos = await Equipo.findAll({
            include: [
                { model: Facultad, as: 'facultad'}
            ],
            order: [[{ model: Facultad, as: 'facultad' }, 'nombre', 'ASC']]
        });
        res.json(equipos);
    } catch (error) {
        console.error('Error al obtener equipos:', error);
        res.status(500).json({ message: 'Error al obtener equipos' });
    }
};

module.exports = { obtenerEquipos };