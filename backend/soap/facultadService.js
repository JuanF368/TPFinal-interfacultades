const { Facultad, Disciplina, Partido, Equipo } = require('../models');

const { Op, where, col } = require('sequelize');

const facultadesService = {
    FacultadService: {
        FacultadServicePort: {
            async getFacultades() {
                try {
                    const facultades = await Facultad.findAll();
                    const result = facultades.map(f => ({
                        idfacultad: f.idfacultad,
                        nombre: f.nombre,
                        siglas: f.siglas,
                        puntos: f.puntos
                    }));
                    return result ;
                } catch (error) {
                    console.error('Error al obtener facultades:', error);
                    throw new Error('Error al obtener facultades');
                }
            },
            async getFacultadPorSigla({ sigla }) {
                try {
                    const facultad = await Facultad.findOne({ where: { siglas: sigla } });
                    return facultad || {};
                } catch (error) {
                    console.error('Error al obtener facultad por sigla:', error);
                    throw new Error('Error al obtener facultad por sigla');
                }
            },
            async getDisciplinas(){
                try {
                    const disciplinas = await Disciplina.findAll();
                    const result = disciplinas.map(d => ({
                        iddisciplina: d.iddisciplina,
                        nombre: d.nombre,
                        reglamento: d.reglamento
                    }));
                    return result;
                } catch (error) {
                    console.error('Error al obtener disciplinas:', error);
                    throw new Error('Error al obtener disciplinas');
                }
            },
            async getPartidos({ filtros }) {
                try {
                    const wherePartido = {};
                    let facultadFilter = undefined;
                    if (filtros) {
                        if (filtros.iddisciplina) wherePartido.iddisciplina = filtros.iddisciplina;
                        if (filtros.fecha) wherePartido.fecha = filtros.fecha;
                        if (filtros.idfacultad){
                            const idFac = parseInt(filtros.idfacultad);
                            facultadFilter = {
                                [Op.or]: [
                                    where(col('equipo1.idfacultad'), idFac),
                                    where(col('equipo2.idfacultad'), idFac)
                                ]
                            };
                        }
                    }

                    const partidos = await Partido.findAll({
                        where: facultadFilter ? { ...wherePartido, ...facultadFilter } : wherePartido,
                        include: [
                            { model: Equipo, as: "equipo1", include: [ { model: Facultad, as: "facultad" } ] },
                            { model: Equipo, as: "equipo2", include: [ { model: Facultad, as: "facultad" } ] },
                            { model: Disciplina, as: "disciplina" }
                        ],
                        order: [ ['fecha', 'DESC'], ['hora', 'DESC'] ]
                    });

                    return { return: JSON.stringify(partidos) };

                } catch (error) {
                    console.error('Error al obtener partidos:', error);
                    throw new Error('Error al obtener partidos');
                }
            },
            async actualizarResultado({ idpartido, resequipo1, resequipo2 }){
                try{
                    await Partido.update(
                        { resequipo1, resequipo2 },
                        { where: { idpartido } }
                    );
                    return { return: 'Resultado actualizado correctamente' };
                } catch (error) {
                    console.error('Error al actualizar resultado:', error);
                    throw new Error('Error al actualizar resultado');
                }
            }
        }
    }
}

module.exports = facultadesService;