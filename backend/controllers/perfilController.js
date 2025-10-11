const db = require('../db');

const publicacionesUsuario = (req, res) => { 
    const idUsuario = req.user.idusuario; 
    const consulta = `SELECT p.*, GROUP_CONCAT(i.url) AS imagenes FROM publicacion p 
    LEFT JOIN imagen i ON p.idpublicacion = i.idpublicacion WHERE p.idusuario = ? 
    GROUP BY p.idpublicacion ORDER BY p.fecha DESC`;
    
    db.query(consulta, [idUsuario], (err, result) => {
        if (err){
            console.log('Error en las pubicaciones del usuario: ', err); 
            return res.status(500).json({error: 'Error al obtener las publicaciones'}); 
        }
        const publicaciones = result.map(pub => ({ 
            ...pub, 
            imagenes: pub.imagenes ? pub.imagenes.split(',') :[]
        }));
        res.status(200).json(publicaciones);
    })
}

const eliminarPublicacion = (req, res) => {
    const idUsuario = req.user.idusuario; 
    const idPublicacion = req.params.id;
    const consulta = `DELETE FROM publicacion WHERE idpublicacion = ? AND idusuario = ?`;

    db.query(consulta, [idPublicacion, idUsuario], (err,result) => {
        if(err) { 
            console.error('Error al eliminar la publicacion:', err); 
            return res.status(500).json({ error: 'Error al eliminar publicacion'}); 
        }

        res.json({ mensaje: 'Publicacion eliminada' });
    })
}

const editarPublicacion = (req, res) => {
   
}

module.exports = {publicacionesUsuario, eliminarPublicacion, editarPublicacion};