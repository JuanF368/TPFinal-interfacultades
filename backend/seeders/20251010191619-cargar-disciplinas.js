'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('disciplina', [
      { nombre: 'Basquet', imagen: '/disciplinas/basket.jpg' , reglamento: 'https://drive.google.com/file/d/1V6w5A6R7oZLAAEWlEgwGeTV9LoEgOpTL/view' , mixto: false, masculino: true, femenino: true},
      { nombre: 'Handball', imagen:'/disciplinas/handball.jpg'  , reglamento: 'https://drive.google.com/file/d/1-bXF-wNH-XP7tH7Y-KDuhQCvQhQPPPFx/view' , mixto: false, masculino: true, femenino: true},
      { nombre: 'Tenis de Mesa', imagen: '/disciplinas/tenismesa.jpg' , reglamento: 'https://drive.google.com/file/d/1yz7uYdD5_CCCx83M88tMV_KWzN3qBdpd/view', mixto: true, masculino: false, femenino: false },
      { nombre: 'Hockey', imagen: '/disciplinas/hockey.jpeg' ,  reglamento: 'https://drive.google.com/file/d/1Q5s2QGLQjGSJOiWyUJdw2HbN4u3TqnDb/view' , mixto: false, masculino: false, femenino: true},
      { nombre: 'Esport', imagen: '/disciplinas/esports.jpg' , reglamento: 'https://drive.google.com/file/d/1BDjmr56msjZveRqd6fNgLTjITzNKDWHA/view', mixto: true, masculino: false, femenino: false },
      { nombre: 'Futsal', imagen: '/disciplinas/futsal.jpg' , reglamento: 'https://drive.google.com/file/d/18ZxaU2fHSADnbm23SvUu8TvQb1ffk9Bu/view', mixto: false, masculino: true, femenino: true },
      { nombre: 'Rugby',imagen: '/disciplinas/tugby.jpg',  reglamento: 'https://drive.google.com/file/d/1WafhBFYCWnR_AfV2pJoedk2s9MATIclF/view' , mixto: false, masculino: true, femenino: false},
      { nombre: 'Voley',imagen: '/disciplinas/voley.jpg' ,  reglamento: 'https://drive.google.com/file/d/10jhCbMo16acV6L1qYRQSJLMtakQJM6Po/view' , mixto: false, masculino: true, femenino: true},
      { nombre: 'Atletismo', imagen:  '/disciplinas/atletismo.jpeg', reglamento: 'https://drive.google.com/file/d/1xc0waXcPBxeFnBvGpp7ZIqaaJjZCunDc/view' , mixto: false, masculino: true, femenino: true},
      { nombre: 'Badminton',imagen: '/disciplinas/badminton.jpg' ,  reglamento: 'https://drive.google.com/file/d/1oTr2taDuJEaVdHPMhqD7vLE5N8aO9t9g/view' , mixto: true, masculino: false, femenino: false},
      { nombre: 'Ajedrez', imagen:'/disciplinas/ajedrez.jpg', reglamento: 'https://drive.google.com/file/d/1opaaJG9vGsSkm77DXldNLz7fpciUBacg/view' , mixto: true, masculino: false, femenino: false},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('disciplina', null, {});
  }
};
