'use strict';

module.exports = (sequelize, DataTypes) => {
    const Facultad = sequelize.define('Facultad', {
        idfacultad: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        siglas: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        puntos: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        logo: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'facultad',
        timestamps: false
    });

    Facultad.associate = (models) => {
        //Facultad.hasMany(models.Equipo, { foreignKey: 'idfacultad', as: 'equipos' });
    }

    return Facultad;
};