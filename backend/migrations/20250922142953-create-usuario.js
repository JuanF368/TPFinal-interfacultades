'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      idusuario: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      usnombre: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      usapellido: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      usmail: {
        type: Sequelize.STRING(80),
        allowNull: false,
        unique: true
      },
      uspass: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      idrol: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'rol',
          key: 'idrol'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuario');
  }
};
