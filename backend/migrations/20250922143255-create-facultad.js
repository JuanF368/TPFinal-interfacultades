'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('facultad', {
      idfacultad: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      siglas: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      puntos: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('facultad');
  }
};
