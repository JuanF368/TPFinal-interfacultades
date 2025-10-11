const cors = require('cors');
const express = require("express");
const app = express();
const routes = require('./routes/endPoints')
const db = require('./models')

app.use(cors({
  origin: ['http://localhost:5173'], 
  methods: ['GET', 'POST','PUT', 'DELETE']
}));
app.use(express.json());
app.use('/', routes); 

db.sequelize.sync({ alter: false })
  .then(() => {
    console.log('Conexion a la base de datos establecida');
    app.listen(3001,()=>{
      console.log("Corriendo en el puerto 3001")
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  })

app.use('/uploads', express.static('uploads'));
