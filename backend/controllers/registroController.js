//const db= require('../db'); 
const bcrypt = require("bcrypt"); 
const { Usuario } = require('../models');

const crearUsuario = async (req, res) => {
  const {nombre, apellido, email, contrasenia} = req.body;
  
  try{
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    await Usuario.create({
      usnombre: nombre,
      usapellido: apellido,
      usmail: email,
      uspass: hashedPassword,
      idrol: 1 //cambiar a futuro cuando definamos roles
    });

    res.send("Usuario registrado con exito");
    /*
    const sql = "INSERT INTO usuario (usnombre, usapellido, usmail, uspass, idrol) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nombre, apellido, email, hashesPassword, 1], (err, result) => {
      if(err){
        console.log(err);
      }else{
        res.send("Usuario registrado con exito");
      }
    });
    */
  } catch (error) {
    console.log(error);
  }
}

module.exports = { crearUsuario };