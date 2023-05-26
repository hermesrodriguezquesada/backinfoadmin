'use strict';
const {Permission, Role} = require('../models');
const {Op} = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.sequelize.query(`update "Permissions" set "name" = 'READ' || substr("name", 4, length("name")) where "name" ilike 'GET_%';`);

        const adminRole = await Role.findOne({
            where: {
                name: 'ADMINISTRATOR'
            }
        });

        const createNewsPermission = await Permission.create({
            name: 'CREATE_NEWS',
            active: true
        });

        const readNewsPermission = await Permission.create({
            name: 'READ_NEWS',
            active: true
        });

        const updateNewsPermission = await Permission.create({
            name: 'UPDATE_NEWS',
            active: true
        });

        const deleteNewsPermission = await Permission.create({
            name: 'DELETE_NEWS',
            active: true
        });

        return await adminRole.addPermissions([createNewsPermission, readNewsPermission, updateNewsPermission, deleteNewsPermission]);
    },

    down: async (queryInterface, Sequelize) => {
        await Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['CREATE_NEWS', 'READ_NEWS', 'UPDATE_NEWS', 'DELETE_NEWS']
                }
            }
        });
        return await queryInterface.sequelize.query(`update "Permissions" set "name" = 'GET' || substr("name", 5, length("name")) where "name" ilike 'READ_%';`);
    }
};
