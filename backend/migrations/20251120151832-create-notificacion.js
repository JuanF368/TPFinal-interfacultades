'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('notificacion', {
      idnotificacion: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      idusuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuario',
          key: 'idusuario'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      mensaje: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      tipo: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'info'
      },
      leida: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('notificacion');
  }
};
