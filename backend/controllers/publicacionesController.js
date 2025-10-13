const { Publicacion, Imagen, Usuario } = require('../models');

const publicaciones = async (req, res ) => {
  try{
    const limit = parseInt(req.query.limit) || 5; //paginado
    const offset = parseInt(req.query.offset) || 0;
    const results = await Publicacion.findAll({
      include: [
        { model: Usuario, attributes: ['usnombre', 'usapellido'] },
        { model: Imagen, attributes: ['idimagen', 'url'] }
      ],
      order: [['fecha', 'DESC']],
      limit,
      offset
    });

    const publicaciones = results.map(pub => ({
      ...pub.toJSON(),
      nombreUsuario: `${pub.Usuario?.usnombre ?? ''} ${pub.Usuario?.usapellido ?? ''}`.trim(),
      imagenes: pub.Imagens?.map(img => ({ idimagen: img.idimagen, url:img.url})) ?? []
    }));
    res.status(200).json(publicaciones);
  } catch (err) {
    console.error('Error al obtener publicaciones:', err);
    res.status(500).json({ error: 'Error al obtener publicaciones' });
  }
};

const crearPublicacion = async (req, res) => {
  try{
    const { titulo, contenido } = req.body;
    const idusuario = req.user.idusuario; 

    const nuevaPublicacion = await Publicacion.create({
      titulo,
      contenido,
      idusuario
    });

    if(!req.files || req.files.length === 0){
      return res.status(201).json({ mensaje: 'Publicacion creada sin imagenes' });
    }

    const imagenes = req.files.map(file => {
      const nombreArchivo = file.existing ? file.originalname : file.filename;
      return {
        url: `/uploads/${nombreArchivo}`,
        idpublicacion: nuevaPublicacion.idpublicacion
      }
    });

    await Imagen.bulkCreate(imagenes);
    res.status(201).json({ mensaje: 'Publicacion e imagenes creadas correctamente' });
  } catch(error){
    console.error('Error al crear publicacion:', error);
    res.status(500).json({ error: 'Error al crear publicación' });
  }
};

module.exports = { publicaciones, crearPublicacion};