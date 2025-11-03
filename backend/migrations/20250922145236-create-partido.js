'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('partido', {
      idpartido: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idequipo1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'equipo',
          key: 'idequipo'
        }
      },
      idequipo2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'equipo',
          key: 'idequipo'
        }
      },
      resequipo1: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      resequipo2: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      },
      lugar: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      iddisciplina: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'disciplina',
          key: 'iddisciplina'
        }
      },
      estado: {
        type: Sequelize.ENUM('pendiente', 'en_curso', 'finalizado'),
        allowNull: false,
        defaultValue: 'pendiente'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('partido');
  }
};
