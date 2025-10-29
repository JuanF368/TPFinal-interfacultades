const { where } = require('sequelize');
const { Convocatoria, Usuario, Rol } = require('../models'); 

const crearConvocatoria = async(req, res) => {
    try{
        const convocatoriaActiva = await Convocatoria.findOne();
        if (convocatoriaActiva){
            return res.status(400).json({ mensaje: 'Ya hay una convocatoria abierta' }); 
        }
        const nueva = await Convocatoria.create(req.body); 
        res.json({convocatoria: nueva}); 
    } catch(error) {
        console.log('Error al crear la convocatoria: ', error); 
        res.status(500).json({ error: 'Error al crear la convocatoria' }); 
    }

}

const editarConvocatoria = async(req, res) => {
    try {
        const {id} = req.params; 
        const convocatoria = await Convocatoria.findByPk(id); 
        if (!convocatoria) {
            return res.status(404).json({mensaje: "No se encuentra la convocatoria"})
        }
        await convocatoria.update(req.body); 
        return res.status(200).json({ convocatoria }); 
    } catch (error){
        console.log('Error al editar la convocatoria: ', error); 
        res.status(500).json({ error: 'Error al editar la convocatoria' }); 
    }
}

const estadoConvocatoria = async(req, res) =>{
    try {
        const convocatoria = await Convocatoria.findOne(); 
        if(!convocatoria){
            return res.status(200).json({ convocatoria: null, estado: null })
        }
        const hoy = new Date();
        let estado = 'fuera de tiempo';
        const inicioUnidades = new Date(convocatoria.inicioUnidades);
        const finUnidades = new Date(convocatoria.finUnidades);
        const inicioInscripcion = new Date(convocatoria.inicioInscripcion);
        const finInscripcion = new Date(convocatoria.finInscripcion);
        const inicioJuegos = new Date(convocatoria.inicioJuegos);
        const finJuegos = new Date(convocatoria.finJuegos);
        
        if (hoy >= inicioUnidades && hoy <= finUnidades) {
            estado = 'inscripcion de unidades academicas';
        } else if (hoy >= inicioInscripcion && hoy <= finInscripcion) {
            estado = 'inscripcion de jugadores';
        } else if (hoy >= inicioJuegos && hoy <= finJuegos) {
            estado = 'juegos en curso';
        } else if (hoy > finJuegos) {
            estado = 'finalizado';
        }

        if(estado === "finalizado") {
            const rolJugador = await Rol.findOne({where: {rodescripcion: 'jugador'}}); 
            const rolUsuario = await Rol.findOne({where:{rodescripcion: 'usuario'}}); 
            if(rolJugador && rolUsuario){
                await  Usuario.update({idrol:rolUsuario.idrol}, {where: {idrol: rolJugador.idrol}}); 
                console.log("Cambio de roles realizado"); 
            } 

        }

        return res.status(200).json({estado, convocatoria}); 
    } catch(error){
        console.error('Error en el estado de la convocatoria:', error);
        return res.status(500).json({ error: 'Error en el estado de la convocatoria' });
    }
}
module.exports = { crearConvocatoria, editarConvocatoria, estadoConvocatoria };