
const express = require("express");
const app = express();
const mysql = require("mysql");

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