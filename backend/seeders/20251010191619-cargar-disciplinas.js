'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('disciplina', [
      { nombre: 'Basquet', reglamento: 'https://drive.google.com/file/d/1V6w5A6R7oZLAAEWlEgwGeTV9LoEgOpTL/view' },
      { nombre: 'Handball', reglamento: 'https://drive.google.com/file/d/1-bXF-wNH-XP7tH7Y-KDuhQCvQhQPPPFx/view' },
      { nombre: 'Tenis de Mesa', reglamento: 'https://drive.google.com/file/d/1yz7uYdD5_CCCx83M88tMV_KWzN3qBdpd/view' },
      { nombre: 'Hockey', reglamento: 'https://drive.google.com/file/d/1Q5s2QGLQjGSJOiWyUJdw2HbN4u3TqnDb/view' },
      { nombre: 'Esport', reglamento: 'https://drive.google.com/file/d/1BDjmr56msjZveRqd6fNgLTjITzNKDWHA/view' },
      { nombre: 'Futsal', reglamento: 'https://drive.google.com/file/d/18ZxaU2fHSADnbm23SvUu8TvQb1ffk9Bu/view' },
      { nombre: 'Rugby', reglamento: 'https://drive.google.com/file/d/1WafhBFYCWnR_AfV2pJoedk2s9MATIclF/view' },
      { nombre: 'Voley', reglamento: 'https://drive.google.com/file/d/10jhCbMo16acV6L1qYRQSJLMtakQJM6Po/view' },
      { nombre: 'Atletismo', reglamento: 'https://drive.google.com/file/d/1xc0waXcPBxeFnBvGpp7ZIqaaJjZCunDc/view' },
      { nombre: 'Badminton', reglamento: 'https://drive.google.com/file/d/1oTr2taDuJEaVdHPMhqD7vLE5N8aO9t9g/view' },
      { nombre: 'Ajedrez', reglamento: 'https://drive.google.com/file/d/1opaaJG9vGsSkm77DXldNLz7fpciUBacg/view' },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('disciplina', null, {});
  }
};
