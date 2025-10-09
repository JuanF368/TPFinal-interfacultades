const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) return res.status(401).json({ error: 'No hay token' });

  try {
    const decoded = jwt.verify(token, "Stack");
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token invalido' });
  }

}

module.exports = verificarToken;