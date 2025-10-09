const db = require('../db'); 

const publicaciones = (req, res ) => {
    const limit = parseInt(req.query.limit) || 5; //paginado
    const offset = parseInt(req.query.offset) || 0;
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
};

const crearPublicacion = (req, res) => {
  const { titulo, contenido } = req.body;
  const idusuario = req.user.idusuario; 
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
};

module.exports = { publicaciones, crearPublicacion};