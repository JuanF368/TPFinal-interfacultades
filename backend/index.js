const cors = require('cors');
const express = require("express");
const routes = require('./routes/endPoints')
const db = require('./models')
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

app.use(cors({
  origin: ['http://localhost:5173'], 
  methods: ['GET', 'POST','PUT', 'DELETE']
}));
app.use(express.json());
app.use('/', routes); 
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

db.sequelize.sync({ alter: false })
  .then(() => {
    console.log('Conexion a la base de datos establecida');
    server.listen(3001,()=>{
      console.log("Corriendo en el puerto 3001")
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  })


