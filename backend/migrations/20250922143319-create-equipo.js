'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipo', {
      idequipo: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idfacultad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'facultad',
          key: 'idfacultad'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipo');
  }
};
