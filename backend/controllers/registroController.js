//const db= require('../db'); 
const bcrypt = require("bcrypt"); 
const { Usuario } = require('../models');
const axios = require("axios"); 
require("dotenv").config();

const crearUsuario = async (req, res) => {
  const {nombre, apellido, email, contrasenia} = req.body;
  
  try{
    const resp = await axios.post("https://api.verifykit.io/v1/verify", {
      email: email},
      {
      headers: { Authorization: `Bearer ${process.env.VERIFYKIT_API_KEY}` }
    });
    const data = resp.data;

    if (!data.valid || data.smtp.state !== "deliverable") {
      return res.status(400).json({ error: "Email no valido o no existe." });
    }

    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    await Usuario.create({
      usnombre: nombre,
      usapellido: apellido,
      usmail: email,
      uspass: hashedPassword,
      idrol: 1 //cambiar a futuro cuando definamos roles
    });

    res.send("Usuario registrado con exito");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { crearUsuario };