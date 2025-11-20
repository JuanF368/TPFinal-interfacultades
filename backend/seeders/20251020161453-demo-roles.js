'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rol', [
      { rodescripcion: 'usuario' },
      { rodescripcion: 'inscripto' },
      { rodescripcion: 'jugador' },
      { rodescripcion: 'profesor' },
      { rodescripcion: 'secretario' },
      { rodescripcion: 'administrador' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol', null, {});
  }
};
