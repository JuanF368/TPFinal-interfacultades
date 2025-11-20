const { Op } = require('sequelize');
const { Usuario, Rol, Notificacion } = require('../models'); 

const listarUsuarios = async(req, res) => {
    try{
       const { rol, busqueda='', pagina=1, limite=35 } = req.query; 
        const where  ={}; 
        const rolWhere = {}; 
        if(busqueda.trim() !== '') {
            const palabras = busqueda.trim().split(/\s+/); 
            where[Op.and] = palabras.map(palabra => ({
                [Op.or]: [
                    { usnombre: { [Op.like]: `%${palabra}%` } },
                    { usapellido: { [Op.like]: `%${palabra}%` } }
                ]
            }));
        }
        
        if(rol && rol.trim() !== ''){
            rolWhere.rodescripcion = rol;
        }

        const offset = (pagina -1)* limite; 
        const {count, rows} = await Usuario.findAndCountAll({
            where, include: [{model: Rol, as:'rol', ...(Object.keys(rolWhere).length > 0 && { where: rolWhere })}], 
            limit: parseInt(limite), offset:parseInt(offset), order: [['usnombre', 'ASC']]
        }); 
        return res.status(200).json({total: count, pagina: parseInt(pagina), paginasTotales: Math.ceil(count / limite),
            usuarios: rows})
    } catch(error){ 
        console.error('Error al listar usuarios: ', error); 
        return res.status(500).json({error: 'Error al listar usuarios'}); 
    }
}

const actualizarRolUsuario = async(req,res) =>{
    try{
        const { id } = req.params;
        const { nuevoRolId } = req.body;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const rol = await Rol.findByPk(nuevoRolId);
        if (!rol) {
            return res.status(400).json({ error: 'Rol no valido' });
        }

        const rolViejo = usuario.idrol; 
        usuario.idrol = nuevoRolId;
        await usuario.save();
        const io = req.app.get('io');
        if(rolViejo === 2 && nuevoRolId === 3){
            const mensaje = "Fuiste seleccionado para representar como jugador a tu facultad en las Interfacultades!"; 
            await Notificacion.create({idusuario: id, mensaje, tipo: "aceptacion", leida:false});
            io.to(`user_${usuario.idusuario}`).emit("rolActualizado", { mensaje});       
        }
        return res.status(200).json({ mensaje: 'Rol actualizado correctamente', usuario });
    } catch(error){ 
        console.error('Error al cambiar rol del usuario: ', error); 
        return res.status(500).json({error: 'Error al cambiar rol del usuario'}); 
    }
}

module.exports = {listarUsuarios, actualizarRolUsuario}; 