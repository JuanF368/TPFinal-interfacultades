'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu', {
      idmenu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      menombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      medescripcion: {
        type: Sequelize.STRING(150),
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menu');
  }
};
