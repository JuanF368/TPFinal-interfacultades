'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rol', [
      { rodescripcion: 'alumno' },
      { rodescripcion: 'jugador' },
      { rodescripcion: 'profesor' },
      { rodescripcion: 'admin' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rol', null, {});
  }
};
