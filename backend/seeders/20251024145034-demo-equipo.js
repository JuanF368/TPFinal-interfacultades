'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('equipo', [
      { idfacultad: 3 },
      { idfacultad: 5 },
      { idfacultad: 7 },
      { idfacultad: 9 },
      { idfacultad: 11 },
      { idfacultad: 13 },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('equipo', null, {});
  }
};
