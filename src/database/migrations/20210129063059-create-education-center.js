'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EducationCenters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      shortDescription: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      globalRankingYear: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      globalRanking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      cubanRankingYear: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      cubanRanking: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      foundationYear: {
        type: Sequelize.INTEGER
      },
      logo: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      rectorName: {
        type: Sequelize.STRING
      },
      rectorImage: {
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
      isCertified: {
        type: Sequelize.BOOLEAN
      },
      certificationLevel: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      schoolYearId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      updatedAtSigies: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.dropTable('EducationCenters');
  }
};
