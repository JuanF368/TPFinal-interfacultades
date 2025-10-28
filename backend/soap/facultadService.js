const { Facultad, Disciplina } = require('../models');

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
            }
        }
    }
}

module.exports = facultadesService;