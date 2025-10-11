'use strict';

module.exports = (sequelize, DataTypes) => {
    const Publicacion = sequelize.define('Publicacion', {
        idpublicacion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        contenido: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'publicacion',
        timestamps: false
    });

    Publicacion.associate = (models) => {
        Publicacion.belongsTo(models.Usuario, { foreignKey: 'idusuario'});
        Publicacion.hasMany(models.Imagen, { foreignKey: 'idpublicacion'});
    }

    return Publicacion;
};