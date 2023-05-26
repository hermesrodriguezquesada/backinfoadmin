'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      ci: {
        type: Sequelize.STRING
      },
      provinceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Provinces',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      municipality: {
        type: Sequelize.STRING
      },
      incomeSourceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'IncomeSources',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      preuniversity: {
        type: Sequelize.STRING
      },
      commision: {
        type: Sequelize.STRING
      },
      applications: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.STRING
      },
      assignations: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  }
};
