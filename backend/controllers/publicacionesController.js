//const db = require('../db'); 

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
    /*
    const consulta  = `SELECT p.*, CONCAT(u.usnombre, ' ', u.usapellido) AS nombreUsuario, GROUP_CONCAT(i.url) AS imagenes
    FROM publicacion p LEFT JOIN usuario u ON p.idusuario = u.idusuario
    LEFT JOIN imagen i ON p.idpublicacion = i.idpublicacion GROUP BY p.idpublicacion ORDER BY p.fecha DESC`;
    
    db.query(consulta,(err, results) => {
        if (err) {
          console.error('Error al obtener publicaciones:', err);
          return res.status(500).json({ error: 'Error al obtener publicaciones' });
        }
        
        const publicaciones = results.map(pub => ({
          ...pub,
          imagenes: pub.imagenes ? pub.imagenes.split(',') : []
        }));
        res.status(200).json(publicaciones);
    })
        */
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

    const imagenes = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      idpublicacion: nuevaPublicacion.idpublicacion
    }));

    await Imagen.bulkCreate(imagenes);
    res.status(201).json({ mensaje: 'Publicacion e imagenes creadas correctamente' });
  } catch(error){
    console.error('Error al crear publicacion:', error);
    res.status(500).json({ error: 'Error al crear publicación' });
  }

    /*
    const consulta = 'INSERT INTO publicacion (titulo, contenido, idusuario) VALUES (?, ?, ?)';
    db.query(consulta, [titulo, contenido, idusuario], (err, result) => {
      if (err) {
        console.error('Error al insertar publicacion:', err);
        return res.status(500).json({ error: 'Error al crear publicación' });
      }
      
      const idpublicacion = result.insertId;
      if (!req.files || req.files.length === 0) {
        return res.status(201).json({ mensaje: 'Publicacion creada sin imagenes' });
      }

      const imagenes = req.files.map(file => [`/uploads/${file.filename}`, idpublicacion]);
      const consultaImagenes = 'INSERT INTO imagen (url, idpublicacion) VALUES ?';

      db.query(consultaImagenes, [imagenes], (err2) => {
        if (err2) {
          console.error('Error al insertar imágenes:', err2);
          return res.status(500).json({ error: 'Publicacion creada, pero error al guardar imagenes' });
        }

        res.status(201).json({ mensaje: 'Publicacion e imagenes creadas correctamente' });
      });
    });
    */
};

module.exports = { publicaciones, crearPublicacion};