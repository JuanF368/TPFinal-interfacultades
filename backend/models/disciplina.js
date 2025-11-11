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
        imagen: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        reglamento: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        mixto: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        masculino: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        femenino: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'disciplina',
        timestamps: false
    });

    Disciplina.associate = (models) => {
        Disciplina.hasMany(models.Partido, { foreignKey: 'iddisciplina', as: 'partidos' });
    }

    Disciplina.prototype.getTipo = function () {
        if (this.mixto) return 'Mixto';
        if (this.masculino && this.femenino) return 'Masculino y Femenino';
        if (this.masculino) return 'Masculino';
        if (this.femenino) return 'Femenino';
        return 'Sin especificar';
    };

    return Disciplina;
};
