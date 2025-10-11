//const db = require('../db');

const { Publicacion, Imagen } = require('../models'); 

const publicacionesUsuario = async(req, res) =>{
    try {
        const idUsuario = req.user.idusuario; 
        const publicaciones = await Publicacion.findAll({
            where: { idusuario: idUsuario},
            include:[{ model: Imagen,attributes: ['idimagen', 'url']}],
            order: [['fecha', 'DESC']]
        }); 
        const resultado = publicaciones.map(pub => ({ 
            ...pub.toJSON(), 
            imagenes: pub.Imagens?.map(img => ({idimagen: img.idimagen, url:img.url})) || []
        }));
        res.status(200).json(resultado);
    } catch (error) {
        console.log('Error en las pubicaciones del usuario: ', error); 
        return res.status(500).json({error: 'Error al obtener las publicaciones'}); 
    }
}; 

const eliminarPublicacion = async(req, res) => {
    try { 
        const idUsuario = req.user.idusuario; 
        const idPublicacion = req.params.id;
        const publicacion = await Publicacion.findOne({
        where: {
            idpublicacion: idPublicacion, idusuario: idUsuario
        } });

        if (!publicacion){
            return res.status(404).json({ error: 'No existe la publicacion' });
        }
         
        await publicacion.destroy();
        res.json({ mensaje: 'Publicacion eliminada' });

    } catch (error){
        console.error('Error al eliminar la publicacion:', error); 
        return res.status(500).json({ error: 'Error al eliminar publicacion'}); 
    }
}

const editarPublicacion = async (req, res) => {
  try {
    const idUsuario = req.user.idusuario;
    const idPublicacion = req.params.id;
    const { titulo, contenido } = req.body;
    const imagenesExistentes = req.body.imagenesExistentes || []; 
    const idsConservar = Array.isArray(imagenesExistentes) ? imagenesExistentes : [imagenesExistentes];

    const publicacion = await Publicacion.findOne({
      where: {
        idpublicacion: idPublicacion, idusuario: idUsuario
      },
      include: Imagen
    });

    if (!publicacion) {
      return res.status(404).json({ error: 'No existe la publicacion' });
    }
    publicacion.titulo = titulo || publicacion.titulo;
    publicacion.contenido = contenido || publicacion.contenido;
    await publicacion.save();

    const imagenesAEliminar = publicacion.Imagens.filter(img => !idsConservar.includes(img.idimagen.toString()));
    const idsAEliminar = imagenesAEliminar.map(img => img.idimagen);
    if (idsAEliminar.length > 0) {
      await Imagen.destroy({ where: { idimagen: idsAEliminar } });
    }

    if (req.files && req.files.length > 0) {
      const nuevasImagenes = req.files.map(file => ({
        url: `/uploads/${file.filename}`,
        idpublicacion: idPublicacion
      }));
      await Imagen.bulkCreate(nuevasImagenes);
    }
    return res.json({ mensaje: 'Publicacion editada' });

  } catch (error) {
    console.error('Error al editar publicacion:', error);
    return res.status(500).json({ error: 'Error al editar la publicacion' });
  }
};

module.exports = {publicacionesUsuario, eliminarPublicacion, editarPublicacion};