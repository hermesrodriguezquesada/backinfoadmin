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

        const readSectionPermission = await Permission.create({
            name: 'READ_SECTION',
            active: true
        });

        const updateSectionPermission = await Permission.create({
            name: 'UPDATE_SECTION',
            active: true
        });

        return await adminRole.addPermissions([readSectionPermission, updateSectionPermission]);
    },

    down: async (queryInterface, Sequelize) => {
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['READ_SECTION', 'UPDATE_SECTION']
                }
            }
        });
    }
};
