const { Partido, Equipo, Facultad, Disciplina, Sequelize } = require('../models');
const { Op, col, where } = Sequelize;


/*

Ingresa al menu 
→ Selecciona "Partidos" 
→ Selecciona el dia de la interfacultad  
→  se ven los ultimos resultados de las ultimas partidas 
→  Se muestra la opcion de filtrado (por universidad, deporte, fecha, horario) 

*/
const obtenerResultados = async (req, res) => {
    try {
        const { iddisciplina, fecha, idfacultad } = req.query;

        const wherePartido = {};

        if(iddisciplina) wherePartido.iddisciplina = parseInt(iddisciplina, 10);
        if(fecha) wherePartido.fecha = fecha;
        if(idfacultad) {
            const idFac = parseInt(idfacultad, 10);
            wherePartido[Op.or] = [
                where(col('equipo1.idfacultad'), idFac),
                where(col('equipo2.idfacultad'), idFac)
            ];
        }

        const partidos = await Partido.findAll({
            where: wherePartido,
            include: [
                {
                    model: Equipo,
                    as: 'equipo1',
                    include: [{ model: Facultad, as: 'facultad' }]
                },
                {
                    model: Equipo,
                    as: 'equipo2',
                    include: [{ model: Facultad, as: 'facultad' }]
                },
                {
                    model: Disciplina,
                    as: 'disciplina'
                }
            ],
            order: [
                ['fecha', 'DESC'],
                ['hora', 'DESC']
            ]
        });

        res.json(partidos);
    }catch (error) {
        console.error('Error al obtener resultados:', error);
        res.status(500).json({ message: 'Error al obtener resultados' });
    }
};

const actualizarResultados = async (req, res) => {
    
}

module.exports = { obtenerResultados, actualizarResultados };