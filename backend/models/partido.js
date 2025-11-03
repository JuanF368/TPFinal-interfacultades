'use strict';

module.exports = (sequelize, DataTypes) => {
    const Partido = sequelize.define('Partido', {
        idpartido: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idequipo1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idequipo2: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        resequipo1: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        resequipo2: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false
        },
        lugar: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        iddisciplina: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('pendiente', 'en_curso', 'finalizado'),
            allowNull: false,
            defaultValue: 'pendiente',
        }
    }, {
        tableName: 'partido',
        timestamps: false
    });

    Partido.associate = (models) => {
        Partido.belongsTo(models.Equipo, { foreignKey: 'idequipo1', as: 'equipo1' });
        Partido.belongsTo(models.Equipo, { foreignKey: 'idequipo2', as: 'equipo2' });
        Partido.belongsTo(models.Disciplina, { foreignKey: 'iddisciplina', as: 'disciplina' });
    }

    return Partido;
};