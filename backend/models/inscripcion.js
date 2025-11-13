'use strict';

module.exports = (sequelize, DataTypes) => {
    const Inscripcion = sequelize.define('Inscripcion', {
        idinscripcion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        idusuario: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        iddisciplina: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idconvocatoria: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idfacultad: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        legajo: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        talleRemera: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        DNI: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        carrera: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        fechaNac: {
            type: DataTypes.DATE,
            allowNull: false
        },
        restriccionAlimentaria: {
            type: DataTypes.STRING(100),
            allowNull: true
        }
    }, {
        tableName: 'inscripcion',
        timestamps: false
    });

    Inscripcion.associate = (models) => {
        Inscripcion.belongsTo(models.Usuario, { foreignKey: 'idusuario', as: 'usuario'});
        Inscripcion.belongsTo(models.Disciplina, { foreignKey: 'iddisciplina', as: 'disciplina' });
        Inscripcion.belongsTo(models.Convocatoria, { foreignKey: 'idconvocatoria', as: 'convocatoria' });
        Inscripcion.belongsTo(models.Facultad, { foreignKey: 'idfacultad', as: 'facultad' });
    };

    return Inscripcion;
};
