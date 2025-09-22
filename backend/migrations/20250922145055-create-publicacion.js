'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('publicacion', {
      idpublicacion: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      titulo: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      contenido: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      imagen: {
        type: Sequelize.STRING,
        allowNull: true
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
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('publicacion');
  }
};
