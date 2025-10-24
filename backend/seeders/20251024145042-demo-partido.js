'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('partido', [
      {
        idequipo1: 1, //informatica
        idequipo2: 3, //ciencias medicas
        resequipo1: 3,
        resequipo2: 5,
        fecha: '2025-10-22',
        hora: '15:30:00',
        lugar: 'Cancha central',
        iddisciplina: 8, //voley
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('partido', null, {});
  }
};
