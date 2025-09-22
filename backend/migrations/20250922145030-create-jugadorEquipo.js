'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('jugadorequipo', {
      idjugadorequipo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idinscripcion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'inscripcion',
          key: 'idinscripcion'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      idequipo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'equipo',
          key: 'idequipo'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('jugadorequipo');
  }
};
