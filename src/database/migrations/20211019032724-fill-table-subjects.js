'use strict';
const {Subject} = require('../../database/models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await Subject.create({
                name: 'Español',
                description: null,
                slug: 'ESP',
                active: true,
            });

            await Subject.create({
                name: 'Historia',
                description: null,
                slug: 'HIS',
                active: true,
            });

            await Subject.create({
                name: 'Matemática',
                description: null,
                slug: 'MAT',
                active: true,
            });

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    down: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await Subject.destroy({truncate: true});

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
