const { Inscripcion, Convocatoria } = require('../models');

const inscribirse = async(req, res) => {
    try { 
        const { idusuario, iddisciplina, idconvocatoria, idfacultad, legajo, fechaNac, talleRemera, DNI, carrera, restriccionAlimentaria } = req.body; 
        const convocatoria = await Convocatoria.findByPk(idconvocatoria); 
        if(!convocatoria){ 
            return res.status(400).json({message: 'Convocatoria no encontrada'})
        }

        const hoy = new Date(); 
        const fechaInicio = new Date(convocatoria.inicioUnidades); 
        const fechaFin = new Date(convocatoria.finUnidades); 
        if(hoy < fechaInicio || hoy > fechaFin){
            return res.status(400).json({message: 'Convocatoria no habilitada para inscripciones'})
        }

        const esta = await Inscripcion.findOne({ where: { idusuario, idconvocatoria}}); 
        if (esta){ 
            return res.status(400).json({message: 'Usuario ya inscripto en la convocatoria'}); 
        }

        const inscripcion = await Inscripcion.create({idusuario, iddisciplina, idconvocatoria, idfacultad, legajo, fechaNac, talleRemera, DNI, carrera, restriccionAlimentaria}); 
        res.json({inscripcion});
    } catch(error){ 
        console.error('Error al crear la inscripcion:', error);
        res.status(500).json({ error: 'Error al crear la inscripcion' });
    }
} 

module.exports = { inscribirse }; 