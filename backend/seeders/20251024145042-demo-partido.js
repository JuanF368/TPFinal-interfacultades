'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('partido', [
      {
        idfacultad1: 1, //CRUB
        idfacultad2: 2, //FAIN
        resequipo1: 1,
        resequipo2: 0,
        fecha: '2025-10-12',
        hora: '12:25:00',
        lugar: 'Cancha 2',
        iddisciplina: 6, //futsal
      },
      {
        idfacultad1: 3, //FAI
        idfacultad2: 4, //FAEA
        resequipo1: 1,
        resequipo2: 1, //tablas supongo
        fecha: '2025-10-05',
        hora: '09:30:00',
        lugar: 'Biblioteca',
        iddisciplina: 11, //ajedrez
      },
      {
        idfacultad1: 5, //FACIMAR
        idfacultad2: 6, //FACEP
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
