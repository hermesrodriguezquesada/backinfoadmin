'use strict';
const {Permission, Role} = require('../models');
const {Op} = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const adminRole = await Role.findOne({
            where: {
                name: 'ADMINISTRATOR'
            }
        });

        const getEducationCentersPermission = await Permission.create({
            name: 'GET_EDUCATION_CENTERS',
            active: true
        });

        const updateEducationCenterPermission = await Permission.create({
            name: 'UPDATE_EDUCATION_CENTER',
            active: true
        });

        return await adminRole.addPermissions([getEducationCentersPermission, updateEducationCenterPermission]);
    },

    down: async (queryInterface, Sequelize) => {
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['GET_EDUCATION_CENTERS', 'UPDATE_EDUCATION_CENTER']
                }
            }
        });
    }
};
