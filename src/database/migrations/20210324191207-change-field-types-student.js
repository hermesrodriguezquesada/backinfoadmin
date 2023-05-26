'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.removeColumn('Students', 'applications'),
      queryInterface.removeColumn('Students', 'notes'),
      queryInterface.removeColumn('Students', 'assignations'),
      queryInterface.addColumn('Students', 'applications', { type: Sequelize.JSON, allowNull: true }),
      queryInterface.addColumn('Students', 'notes', { type: Sequelize.JSON, allowNull: true }),
      queryInterface.addColumn('Students', 'assignations', { type: Sequelize.JSON, allowNull: true })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.removeColumn('Students', 'applications'),
      queryInterface.removeColumn('Students', 'notes'),
      queryInterface.removeColumn('Students', 'assignations'),
      queryInterface.addColumn('Students', 'applications', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('Students', 'notes', { type: Sequelize.STRING, allowNull: true }),
      queryInterface.addColumn('Students', 'assignations', { type: Sequelize.STRING, allowNull: true })
    ])
  }
};
