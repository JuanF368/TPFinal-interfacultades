'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('disciplina', {
      iddisciplina: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      imagen: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      reglamento: {
        type: Sequelize.STRING(250),
        allowNull: false
      }, 
      mixto: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      masculino: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      femenino: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('disciplina');
  }
};
