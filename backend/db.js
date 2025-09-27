const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'interfacultades',
});
db.connect((error)=>{
  if(error){
    console.log('Error al conectar la base de datos: ', error);
  }
})
module.exports = db;

//conexion a la bd 