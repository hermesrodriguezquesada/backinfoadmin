'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.addColumn('Provinces', 'updatedAtSigies', { type: Sequelize.DATE, allowNull: true }),
      queryInterface.addColumn('Careers', 'updatedAtSigies', { type: Sequelize.DATE, allowNull: true }),
      queryInterface.addColumn('Students', 'updatedAtSigies', { type: Sequelize.DATE, allowNull: true }),
      queryInterface.addColumn('IncomeSources', 'updatedAtSigies', { type: Sequelize.DATE, allowNull: true }),
      queryInterface.addColumn('ScienceAreas', 'updatedAtSigies', { type: Sequelize.DATE, allowNull: true }),
      queryInterface.addColumn('PlacePlans', 'updatedAtSigies', { type: Sequelize.DATE, allowNull: true }),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.removeColumn('Provinces', 'updatedAtSigies'),
      queryInterface.removeColumn('Careers', 'updatedAtSigies'),
      queryInterface.removeColumn('Students', 'updatedAtSigies'),
      queryInterface.removeColumn('IncomeSources', 'updatedAtSigies'),
      queryInterface.removeColumn('ScienceAreas', 'updatedAtSigies'),
      queryInterface.removeColumn('PlacePlans', 'updatedAtSigies'),
    ])
  }
};
