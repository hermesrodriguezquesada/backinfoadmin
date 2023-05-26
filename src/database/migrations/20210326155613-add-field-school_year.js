'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.addColumn('Provinces', 'schoolYearId', { type: Sequelize.INTEGER, allowNull: true }),
      queryInterface.addColumn('Careers', 'schoolYearId', { type: Sequelize.INTEGER, allowNull: true }),
      queryInterface.addColumn('Students', 'schoolYearId', { type: Sequelize.INTEGER, allowNull: true }),
      queryInterface.addColumn('IncomeSources', 'schoolYearId', { type: Sequelize.INTEGER, allowNull: true }),
      queryInterface.addColumn('ScienceAreas', 'schoolYearId', { type: Sequelize.INTEGER, allowNull: true }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.removeColumn('Provinces', 'schoolYearId'),
      queryInterface.removeColumn('Careers', 'schoolYearId'),
      queryInterface.removeColumn('Students', 'schoolYearId'),
      queryInterface.removeColumn('IncomeSources', 'schoolYearId'),
      queryInterface.removeColumn('ScienceAreas', 'schoolYearId'),
    ])
  }
};
