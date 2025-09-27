const db  = require('../db')
//funcion precisa de lo que hace cada endpoint
const ping = (req, res) => {
  const consulta = 'SELECT * FROM usuario';

  db.query(consulta, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error en la consulta' });
    }

    res.status(200).json(results);
  });
};

module.exports = { ping };