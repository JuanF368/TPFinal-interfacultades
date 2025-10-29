const verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    const rolUsuario = req.user?.rodescripcion; 

    if (!rolUsuario) {
      return res.status(401).json({ error: 'Rol no encontrado' });
    }
    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({ error: 'No tienes permiso' });
    }

    next();
  };
};

module.exports = verificarRol;