'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        idusuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usnombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        usapellido: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        usmail:{
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        uspass:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        idrol:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1 //cambiar a futuro cuando definamos roles
        }
    }, {
        tableName: 'usuario',
        timestamps: false
    });
    return Usuario;
};