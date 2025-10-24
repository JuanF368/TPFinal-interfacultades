'use strict';

module.exports = (sequelize, DataTypes) => {
  const Convocatoria = sequelize.define('Convocatoria', {
    idconvocatoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    inicioUnidades: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    finUnidades: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    inicioInscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    finInscripcion: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    inicioJuegos: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    finJuegos: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'convocatoria',
    timestamps: false
  });

  return Convocatoria;
};
