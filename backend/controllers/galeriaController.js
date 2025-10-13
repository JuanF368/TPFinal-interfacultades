const { Galeria } = require('../models');

const obtenerGaleria = async (req, res) => {
    try{
        const fotos = await Galeria.findAll({ order: [['createdAt', 'DESC']] });
        res.json(fotos);
    }catch(error){
        console.error('Error al obtener la galería:', error);
        res.status(500).json({ error: 'Error al obtener las imagenes' });
    }
};

const subirFoto = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se envio ninguna imagen' });
        }
        console.log(req.file);
        const nombreArchivo = req.file.existing ? req.file.originalname : req.file.filename;
        const nueva = await Galeria.create({
            nombre: req.body.nombre,
            ruta: `/uploads/${nombreArchivo}`
        });
        res.json(nueva);
    }catch (error){
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ error: 'Error al subir la imagen' });
    }
};

module.exports = { obtenerGaleria, subirFoto };