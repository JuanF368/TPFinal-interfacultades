'use strict';

module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
        idrol:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rodescripcion: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'rol',
        timestamps: false
    });

    Rol.associate = (models) => {
        Rol.hasMany(models.Usuario, {
            foreignKey: 'idrol',
            as: 'usuarios'
        });
    };

    return Rol;
};