
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

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
app.post("/crearUsuario", (req, res) => {
  const {nombre, apellido, email, contrasenia} = req.body;

  const sql = "INSERT INTO usuario (usnombre, usapellido, usmail, uspass, idrol) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [nombre, apellido, email, contrasenia, 1], (err, result) => {
    if(err){
      console.log(err);
    }else{
      res.send("Usuario registrado con exito");
    }
  });
});

