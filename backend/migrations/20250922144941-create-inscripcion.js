'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inscripcion', {
      idinscripcion: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idusuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'idusuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      iddisciplina: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'disciplina',
          key: 'iddisciplina'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      idconvocatoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'convocatoria',
          key: 'idconvocatoria'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      legajo: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      talleRemera: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      DNI: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      carrera: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      fechaNac: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inscripcion');
  }
};
