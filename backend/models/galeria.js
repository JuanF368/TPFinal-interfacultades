'use strict';

module.exports = (sequelize, DataTypes) => {
    const Galeria = sequelize.define('Galeria', {
        idimagen: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ruta: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'galeria',
        timestamps: true
    });
    return Galeria;
};