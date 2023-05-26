'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return await queryInterface.addColumn('Careers', 'studyPlan', {type: Sequelize.STRING,});
    },

    down: async (queryInterface, Sequelize) => {
        return await queryInterface.removeColumn('Careers', 'studyPlan');
    }
};
