'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('facultad', [
      {
        nombre: 'Centro Regional Universitario Bariloche',
        siglas: 'CRUB',
        puntos: 1273,
        logo: '/logos/facultades/centroBariloche.png',
      },
      {
        nombre: 'Facultad de Ingeniería',
        siglas: 'FAIN',
        puntos: 1106,
        logo: '/logos/facultades/ingenieria.png',
      },
      {
        nombre: 'Facultad de Informática',
        siglas: 'FAI',
        puntos: 654,
        logo: '/logos/facultades/informatica.png',
      },
      {
        nombre: 'Facultad de economía y administración',
        siglas: 'FAEA',
        puntos: 606,
        logo: '/logos/facultades/economia.png',
      },
      {
        nombre: 'Escuela superior de ciencias marinas',
        siglas: 'FACIMAR',
        puntos: 465,
        logo: '/logos/facultades/cienciasmarinas.png',
      },
      {
        nombre: 'Facultad de ciencias de la educacion y psicologia',
        siglas: 'FACEP',
        puntos: 437,
        logo: '/logos/facultades/educacion.jpeg',
      },
      {
        nombre: 'Facultad de ciencias medicas',
        siglas: 'FAME',
        puntos: 397,
        logo: '/logos/facultades/medicina.png',
      },
      {
        nombre: 'Facultad de derecho y ciencias sociales',
        siglas: 'FADECS',
        puntos: 395,
        logo: '/logos/facultades/derecho.png',
      },
      {
        nombre: 'Centro universitario regional zona atlántica',
        siglas: 'CURZAS',
        puntos: 391,
        logo: '/logos/facultades/curzas.jpeg',
      },
      {
        nombre: 'Facultad de ciencias del ambiente y de la salud',
        siglas: 'FACIAS',
        puntos: 307,
        logo: '/logos/facultades/ambiente.png',
      },
      {
        nombre: 'Asentamiento universitario zapala',
        siglas: 'CREUZA',
        puntos: 204,
        logo: null,
      },
      {
        nombre: 'Facultad de humanidades',
        siglas: 'FAHU',
        puntos: 165,
        logo: '/logos/facultades/humanidades.png',
      },
      {
        nombre: 'Asentamiento universitario san martín de los andes',
        siglas: 'CRUSMA',
        puntos: 62,
        logo: null,
      },
      {
        nombre: 'Facultad de ciencias agrarias',
        siglas: 'FACA',
        puntos: 61,
        logo: '/logos/facultades/cienciasAgrarias.png',
      },
      {
        nombre: 'Facultad de lenguas',
        siglas: 'FALE',
        puntos: 55,
        logo: '/logos/facultades/lenguas.png',
      },
      {
        nombre: 'Facultad de turismo',
        siglas: 'FATU',
        puntos: 41,
        logo: '/logos/facultades/turismo.png',
      },
      {
        nombre: 'Facultad de ciencias y tecnología de los alimentos',
        siglas: 'FACTA',
        puntos: 0,
        logo: '/logos/facultades/cienciasytecnologia.png',
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('facultad', null, {});
  }
};
