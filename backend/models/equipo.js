'use strict';

module.exports = (sequelize, DataTypes) => {
    const Equipo = sequelize.define('Equipo', {
        idequipo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idfacultad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'equipo',
        timestamps: false
    });

    Equipo.associate = (models) => {
        Equipo.belongsTo(models.Facultad, { foreignKey: 'idfacultad', as: 'facultad' });
        Equipo.hasMany(models.Partido, { foreignKey: 'idequipo1', as: 'partidosLocal' });
        Equipo.hasMany(models.Partido, { foreignKey: 'idequipo2', as: 'partidosVisitante'});
    }

    return Equipo;
};