'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('partido', [
      {
        idequipo1: 2, //superior ciencias marinas
        idequipo2: 5, //asentamiento universitario zapala
        resequipo1: 1,
        resequipo2: 0,
        fecha: '2025-10-12',
        hora: '12:25:00',
        lugar: 'Cancha 2',
        iddisciplina: 6, //futsal
      },
      {
        idequipo1: 4, //regional zona atlantica
        idequipo2: 6, //universitario san martin de los andes
        resequipo1: 1,
        resequipo2: 1, //tablas supongo
        fecha: '2025-10-05',
        hora: '09:30:00',
        lugar: 'Biblioteca',
        iddisciplina: 11, //ajedrez
      },
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
