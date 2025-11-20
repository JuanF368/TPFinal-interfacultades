'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuario', [
      {
        usnombre: 'usuario',
        usapellido: 'usuario',
        usmail: 'usuario@gmail.com',
        uspass: '$2b$10$Q/RVcxzOboogN5nMYfMjzenCU3dfDFi4Nc9HxbY67C.31voJ/1zWu',
        idrol: 1
      },
      {
        usnombre: 'jugador',
        usapellido: 'jugador',
        usmail: 'jugador@gmail.com',
        uspass: '$2b$10$/MDzui3PsNXouXB/4pCD7.9YiVSZ9Igypvcgu4vmlzRiKaMDWrdRa',
        idrol: 3
      },
      {
        usnombre: 'profesor',
        usapellido: 'profesor',
        usmail: 'profesor@gmail.com',
        uspass: '$2b$10$7AUZt8ZGiscgfhPJPeyVp.tQQViDQ0qvO3rH10408hv3JKW9m7SN6',
        idrol: 4
      },
      {
        usnombre: 'administrador',
        usapellido: 'administrador',
        usmail: 'administrador@gmail.com',
        uspass: '$2b$10$s1UVT2yMTBhM6IH/ECGK0ewi/Bnlj4IACgBR./ukvJ5waWGKDe1D2',
        idrol: 6
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuario', null, {});
  }
};
