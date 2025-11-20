const { Notificacion } = require('../models'); 

const crearNotificacion = async(req, res) => {
    try { 
        const { idusuario, mensaje } = req.body;
        const notificacion = await Notificacion.create({ idusuario, mensaje, leida: false});
        res.json(notificacion); 
    } catch (error){ 
        console.error("Error al crear notificacion:", error);
        res.status(500).json({ error: "Error al crear notificacion" });
    }
}

const notificacionesUsuario = async(req, res) => {
    try{
        const { idusuario } = req.params; 
        const notificaciones = await Notificacion.findAll({where: { idusuario}, order: [['fecha', 'DESC']]}); 
        res.json(notificaciones); 
    } catch(error){ 
        console.error("Error al obtener notificaciones:", error);
        res.status(500).json({ error: "Error al obtener notificaciones" });
    }
}

const notiLeida = async(req, res) => {
    try { 
        const { idusuario } = req.params; 
        await Notificacion.update({ leida: true },{ where: { idusuario } });
        res.json({mensaje: 'Notificaciones leidas'}); 
    } catch(error){
        console.error("Error al marcar notificaciones leidas:", error);
        res.status(500).json({ error: "Error al marcar notificaciones leidas" });
    }
}

module.exports = { crearNotificacion, notificacionesUsuario, notiLeida }