const { Partido, Facultad, Disciplina, Sequelize } = require('../models');
const { Op, col, where } = Sequelize;


const obtenerResultados = async (req, res) => {
    try {
        const { iddisciplina, fecha, idfacultad } = req.query;

        const wherePartido = {};

        if(iddisciplina) wherePartido.iddisciplina = parseInt(iddisciplina, 10);
        if(fecha) wherePartido.fecha = fecha;
        if(idfacultad) {
            const idFac = parseInt(idfacultad, 10);
            wherePartido[Op.or] = [
                { idfacultad1: idFac },
                { idfacultad2: idFac }
            ];
        }

        const partidos = await Partido.findAll({
            where: wherePartido,
            include: [
                {
                    model: Facultad,
                    as: 'facultad1'
                },
                {
                    model: Facultad,
                    as: 'facultad2'
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

        const io = req.app.get('io');
        io.emit('actualizarPartidos');

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
            await actualizarPuntaje(partido, req);
        }

        if(estado === 'en_curso' && (partido.resequipo1 === null || partido.resequipo2 === null)) {
            partido.resequipo1 = 0;
            partido.resequipo2 = 0;
        }

        partido.estado = estado;
        await partido.save();

        const io = req.app.get('io');
        io.emit('actualizarPartidos');

        res.json({ message: 'Estado del partido actualizado correctamente', partido });
    } catch (error) {
        console.error('Error al actualizar estado del partido:', error);
        res.status(500).json({ message: 'Error al actualizar estado del partido' });
    }
}

const actualizarPuntaje = async (partido, req) => {
    try {
        const facultad1 = await Facultad.findByPk(partido.idfacultad1);
        const facultad2 = await Facultad.findByPk(partido.idfacultad2);

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

        const io = req.app.get('io');
        io.emit('actualizarRanking');
    } catch (error) {
        console.error('Error al actualizar puntaje:', error);
    }
}

const crearPartido = async (req, res) => {
    try {
        const { idfacultad1, idfacultad2, iddisciplina, fecha, hora, lugar } = req.body;

        if (!idfacultad1 || !idfacultad2 || !iddisciplina || !fecha || !hora || !lugar) {
            return res.status(400).json({ message: 'Faltan datos obligatorios para crear el partido' });
        }

        if(idfacultad1 === idfacultad2) {
            return res.status(400).json({ message: 'Las facultades no pueden ser iguales' });
        }

        const partido = await Partido.create({
            idfacultad1,
            idfacultad2,
            iddisciplina,
            fecha,
            hora,
            lugar,
            estado: 'pendiente'
        });

        const io = req.app.get('io');
        io.emit('actualizarPartidos');

        return res.json({ message: 'Partido creado correctamente', partido });
    } catch (error) {
        console.error('Error al crear partido:', error);
        res.status(500).json({ message: 'Error al crear partido' });
    }
};

const proximosPartidos= async (req, res) => {
    try {
        const hoy = new Date(); 
        const partidos = await Partido.findAll({
            where: {
                [Op.and]: [
                    { fecha: {[Op.gte]: hoy}},
                    { estado: { [Op.in]: ['pendiente', 'en_curso'] } }
                ]
            }, 
            include: [
                {model:Facultad, as: 'facultad1'}, 
                {model: Facultad, as: 'facultad2'}, 
                {model: Disciplina, as: 'disciplina'}
            ], 
            order: [['fecha', 'ASC'], ['hora', 'ASC']], 
            limit: 3
        }); 
        res.json(partidos)
    }catch(error){ 
        console.error('Error al obtener partidos:', error);
        res.status(500).json({ message: 'Error al obtener partidos' });
    }
}

module.exports = { obtenerResultados, actualizarResultados, actualizarEstado, crearPartido, proximosPartidos };