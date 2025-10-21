'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('facultad', [
      {
        nombre: 'Centro Regional Universitario Bariloche',
        siglas: 'CRUB',
        puntos: 1273,
      },
      {
        nombre: 'Facultad de Ingeniería',
        siglas: 'FAIN',
        puntos: 1106,
      },
      {
        nombre: 'Facultad de Informática',
        siglas: 'FAI',
        puntos: 654,
      },
      {
        nombre: 'Facultad de economía y administración',
        siglas: 'FAEA',
        puntos: 606,
      },
      {
        nombre: 'Escuela superior de ciencias marinas',
        siglas: 'FACIMAR',
        puntos: 465,
      },
      {
        nombre: 'Facultad de ciencias de la educacion y psicologia',
        siglas: 'FACEP',
        puntos: 437,

      },
      {
        nombre: 'Facultad de ciencias medicas',
        siglas: 'FAME',
        puntos: 397,
      },
      {
        nombre: 'Facultad de derecho y ciencias sociales',
        siglas: 'FADECS',
        puntos: 395,
      },
      {
        nombre: 'Centro universitario regional zona atlántica',
        siglas: 'CURZAS',
        puntos: 391,
      },
      {
        nombre: 'Facultad de ciencias del ambiente y de la salud',
        siglas: 'FACIAS',
        puntos: 307,
      },
      {
        nombre: 'Asentamiento universitario zapala',
        siglas: 'CREUZA',
        puntos: 204,
      },
      {
        nombre: 'Facultad de humanidades',
        siglas: 'FAHU',
        puntos: 165,
      },
      {
        nombre: 'Asentamiento universitario san martín de los andes',
        siglas: 'CRUSMA',
        puntos: 62,
      },
      {
        nombre: 'Facultad de ciencias agrarias',
        siglas: 'FACA',
        puntos: 61,
      },
      {
        nombre: 'Facultad de lenguas',
        siglas: 'FALE',
        puntos: 55,
      },
      {
        nombre: 'Facultad de turismo',
        siglas: 'FATU',
        puntos: 41,
      },
      {
        nombre: 'Facultad de ciencias y tecnología de los alimentos',
        siglas: 'FACTA',
        puntos: 0,
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('facultad', null, {});
  }
};
