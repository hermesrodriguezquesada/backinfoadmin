'use strict';
const {Channel} = require('../../database/models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await Channel.create({
                name: 'Cubavisión',
                slug: 'CV',
                active: true,
            });

            await Channel.create({
                name: 'Tele Rebelde',
                slug: 'TR',
                active: true,
            });

            await Channel.create({
                name: 'Canal Educativo',
                slug: 'CE',
                active: true,
            });

            await Channel.create({
                name: 'Canal Educativo 2',
                slug: 'CE2',
                active: true,
            });

            await Channel.create({
                name: 'Multivisión',
                slug: 'MV',
                active: true,
            });

            await Channel.create({
                name: 'Canal Clave',
                slug: 'CC',
                active: true,
            });

            await Channel.create({
                name: 'Canal Caribe',
                slug: 'HD1',
                active: true,
            });

            await Channel.create({
                name: 'Cubavisión HD',
                slug: 'HD2',
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
            await Channel.destroy({truncate: true});

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
