'use strict';

module.exports = (sequelize, DataTypes) => {
    const Imagen = sequelize.define('Imagen', {
        idimagen:{
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        idpublicacion: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    }, {
        tableName: 'imagen',
        timestamps: false
    });

    Imagen.associate = (models) => {
        Imagen.belongsTo(models.Publicacion, { foreignKey: 'idpublicacion'});
    }

    return Imagen;
};