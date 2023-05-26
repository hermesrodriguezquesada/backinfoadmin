'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlacePlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      careerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Careers',
          key: 'id'
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      gender: {
        type: Sequelize.STRING
      },
      modality: {
        type: Sequelize.STRING
      },
      educationCenter: {
        type: Sequelize.INTEGER
      },
      prosecutionID: {
        type: Sequelize.INTEGER
      },
      convocationID: {
        type: Sequelize.INTEGER
      },
      schoolYearId: {
        type: Sequelize.INTEGER
      },
      initialCapacity: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('PlacePlans');
  }
};
