'use strict';

module.exports = (sequelize, DataTypes) => {
    const Disciplina = sequelize.define('Disciplina', {
        iddisciplina: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        reglamento: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    }, {
        tableName: 'disciplina',
        timestamps: false
    });

    Disciplina.associate = (models) => {
        Disciplina.hasMany(models.Partido, { foreignKey: 'iddisciplina', as: 'partidos' });
    }

    return Disciplina;
};
