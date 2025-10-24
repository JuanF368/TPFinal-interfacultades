'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('convocatoria', {
      idconvocatoria: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      inicioUnidades: {
        type: Sequelize.DATE,
        allowNull: false
      },
      finUnidades: {
        type: Sequelize.DATE,
        allowNull: false
      },
      inicioInscripcion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      finInscripcion: {
        type: Sequelize.DATE,
        allowNull: false
      },
      inicioJuegos: {
        type: Sequelize.DATE,
        allowNull: false
      },
      finJuegos: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('convocatoria');
  }
};
