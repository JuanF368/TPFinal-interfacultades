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
            references: {
                model: 'rol',
                key: 'idrol'
            }
        }
    }, {
        tableName: 'usuario',
        timestamps: false
    });

    Usuario.associate = (models) => {
        Usuario.belongsTo(models.Rol, {
            foreignKey: 'idrol',
            as: 'rol'
        });
        Usuario.hasMany(models.Notificacion, {
            foreignKey: 'idusuario',
            as: 'notificaciones'
        });
    };
    
    return Usuario;
};