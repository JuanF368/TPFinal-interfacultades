//const db = require('../db');
const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.login = async (req, res) =>{ 

    const {usmail, uspass} = req.body; 

    try{
        const usuario = await Usuario.findOne({ where: { usmail } });
        if(!usuario){
            return res.send({message: 'Usuario no encontrado'});
        }
        const comparacion = await bcrypt.compare(uspass, usuario.uspass);
        if(!comparacion){
            return res.send({message: 'Usuario o contraseña incorrectos'});
        }

        const token = jwt.sign({idusuario: usuario.idusuario, usmail:usuario.usmail}, "Stack", {
            expiresIn:'15m'
        });
        return res.send({token, message: 'Login exitoso'});
    } catch (error) {
        console.error("error en login:", error);
        return res.status(500).send({message: 'Error en el servidor'});
    }
};
