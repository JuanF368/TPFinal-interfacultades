const cors = require('cors');
const express = require("express");
const app = express();
const routes = require('./routes/endPoints')

app.use(cors({
  origin: ['http://localhost:5173'], 
  methods: ['GET', 'POST']
}));
app.use(express.json());
app.use('/', routes); 
app.listen(3001,()=>{
  console.log("Corriendo en el puerto 3001")
})
app.use('/uploads', express.static('uploads'));
