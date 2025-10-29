'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkUpdate('rol',
      { rodescripcion: 'usuario' }, 
      { rodescripcion: 'alumno' } 
    );

    await queryInterface.bulkUpdate('rol',
      { rodescripcion: 'administrador' },
      { rodescripcion: 'admin' }
    );
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkUpdate('rol',
      { rodescripcion: 'alumno' },
      { rodescripcion: 'usuario' }
    );

    await queryInterface.bulkUpdate('rol',
      { rodescripcion: 'administrador' },
      { rodescripcion: 'admin' }
    );
  }
};
