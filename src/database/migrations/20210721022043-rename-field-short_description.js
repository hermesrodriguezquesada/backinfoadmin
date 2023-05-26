'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.renameColumn('Careers', 'short_description', 'shortDescription');
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.renameColumn('Careers', 'shortDescription', 'short_description');
  }
};

