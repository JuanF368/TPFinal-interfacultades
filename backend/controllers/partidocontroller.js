const { Partido, Equipo, Facultad, Disciplina, Sequelize } = require('../models');
const { Op, col, where } = Sequelize;


/*

Ingresa al menu 
→ Selecciona "Partidos" 
→ Selecciona el dia de la interfacultad  
→  se ven los ultimos resultados de las ultimas partidas 
→  Se muestra la opcion de filtrado (por universidad, deporte, fecha, horario) 

*/

//agregar para que al pasar el estado de un partido a finalizado, se sume el puntaje a la facultad respectiva segun estos parametros: gano +3 puntos, empate +1 punto, perdio 0 puntos.
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
    try {
        const { id } = req.params;
        const { resequipo1, resequipo2 } = req.body;

        const partido = await Partido.findByPk(id);

        if(!partido) {
            return res.status(404).json({ message: 'Partido no encontrado' });
        }

        partido.resequipo1 = resequipo1;
        partido.resequipo2 = resequipo2;
        await partido.save();

        res.json({ message: 'Resultados actualizados correctamente', partido });

    }catch (error) {
        console.error('Error al actualizar resultados:', error);
        res.status(500).json({ message: 'Error al actualizar resultados' });
    }
}

const actualizarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const partido = await Partido.findByPk(id);
        if(!partido) return res.status(404).json({ message: 'Partido no encontrado' });

        if(partido.estado === 'finalizado') {
            return res.status(400).json({ message: 'No se puede cambiar el estado de un partido finalizado' });
        }

        const validTransitions = {
            pendiente: ['en_curso'],
            en_curso: ['finalizado'],
            finalizado: []
        }

        if(!validTransitions[partido.estado].includes(estado)) {
            return res.status(400).json({ message: `Transición de estado inválida de ${partido.estado} a ${estado}` });
        }

        if(estado === 'finalizado') {
            await actualizarPuntaje(partido);
        }

        partido.estado = estado;
        await partido.save();

        res.json({ message: 'Estado del partido actualizado correctamente', partido });
    } catch (error) {
        console.error('Error al actualizar estado del partido:', error);
        res.status(500).json({ message: 'Error al actualizar estado del partido' });
    }
}

const actualizarPuntaje = async (partido) => {
    try {
        const equipo1 = await Equipo.findByPk(partido.idequipo1);
        const equipo2 = await Equipo.findByPk(partido.idequipo2);

        const facultad1 = await Facultad.findByPk(equipo1.idfacultad);
        const facultad2 = await Facultad.findByPk(equipo2.idfacultad);

        if(partido.resequipo1 > partido.resequipo2) {
            facultad1.puntos += 3;
        } else if(partido.resequipo1 < partido.resequipo2) {
            facultad2.puntos += 3;
        } else {
            facultad1.puntos += 1;
            facultad2.puntos += 1;
        }
        await facultad1.save();
        await facultad2.save();
    } catch (error) {
        console.error('Error al actualizar puntaje:', error);
    }
}

const crearPartido = async (req, res) => {
    try {
        const { idequipo1, idequipo2, iddisciplina, fecha, hora, lugar } = req.body;
        
        if (!idequipo1 || !idequipo2 || !iddisciplina || !fecha || !hora || !lugar) {
            return res.status(400).json({ message: 'Faltan datos obligatorios para crear el partido' });
        }

        if(idequipo1 === idequipo2) {
            return res.status(400).json({ message: 'Los equipos no pueden ser iguales' });
        }

        const partido = await Partido.create({
            idequipo1,
            idequipo2,
            iddisciplina,
            fecha,
            hora,
            lugar,
            estado: 'pendiente'
        });

        return res.json({ message: 'Partido creado correctamente', partido });
    } catch (error) {
        console.error('Error al crear partido:', error);
        res.status(500).json({ message: 'Error al crear partido' });
    }
};

module.exports = { obtenerResultados, actualizarResultados, actualizarEstado, crearPartido };