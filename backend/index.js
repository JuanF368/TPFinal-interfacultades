
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"interfacultades"
})

app.listen(3001,()=>{
  console.log("Corriendo en el puerto 3001")
})

db.connect(function(error){
  if(error){
    throw error; 
  } else {
    console.log("Conexion a la base de datos de Interfacultades exitosa");
  }
})

//endpoint el registro
app.post("/crearUsuario", async (req, res) => {
  const {nombre, apellido, email, contrasenia} = req.body;
  
  try{
    const hashesPassword = await bcrypt.hash(contrasenia, 10);

    const sql = "INSERT INTO usuario (usnombre, usapellido, usmail, uspass, idrol) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nombre, apellido, email, hashesPassword, 1], (err, result) => {
      if(err){
        console.log(err);
      }else{
        res.send("Usuario registrado con exito");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

