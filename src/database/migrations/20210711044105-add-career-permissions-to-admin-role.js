'use strict';
const {Permission, Role} = require('../models');
const {Op} = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const adminRole = await Role.findOne({
            where: {
                name: 'Admin'
            }
        });
        await adminRole.update({name: 'ADMINISTRATOR'});

        const getCareersPermission = await Permission.create({
            name: 'GET_CAREERS',
            active: true
        });

        const updateCareerPermission = await Permission.create({
            name: 'UPDATE_CAREER',
            active: true
        });

        return await adminRole.setPermissions([getCareersPermission, updateCareerPermission]);
    },

    down: async (queryInterface, Sequelize) => {
        const adminRole = await Role.findOne({
            where: {
                name: 'ADMINISTRATOR'
            }
        });
        await adminRole.update({name: 'Admin'});
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['GET_CAREERS', 'UPDATE_CAREER']
                }
            }
        });
    }
};
