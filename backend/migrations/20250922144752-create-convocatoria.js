'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('convocatoria', {
      idconvocatoria: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      fechafin: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fechainicio: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('convocatoria');
  }
};
