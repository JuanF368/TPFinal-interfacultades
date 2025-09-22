'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menurol', {
      idmenu: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'menu',
          key: 'idmenu'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      idrol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rol',
          key: 'idrol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('menurol');
  }
};
