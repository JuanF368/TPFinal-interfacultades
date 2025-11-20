'use strict';

module.exports = (sequelize, DataTypes) => {
    const Notificacion = sequelize.define('Notificacion', {
        idnotificacion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        mensaje: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'info'
        },
        leida: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'notificacion',
        timestamps: false 
    });

    Notificacion.associate = function(models) {
        Notificacion.belongsTo(models.Usuario, { foreignKey: 'idusuario', as: 'usuario' });
    };

  return Notificacion;
};
