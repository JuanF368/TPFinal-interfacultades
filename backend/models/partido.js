'use strict';

module.exports = (sequelize, DataTypes) => {
    const Partido = sequelize.define('Partido', {
        idpartido: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idfacultad1: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idfacultad2: {
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
        Partido.belongsTo(models.Facultad, { foreignKey: 'idfacultad1', as: 'facultad1' });
        Partido.belongsTo(models.Facultad, { foreignKey: 'idfacultad2', as: 'facultad2' });
        Partido.belongsTo(models.Disciplina, { foreignKey: 'iddisciplina', as: 'disciplina' });
    }

    return Partido;
};