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

        const readContactTypePermission = await Permission.create({
            name: 'READ_CONTACT_TYPE',
            active: true
        });

        const updateContactTypePermission = await Permission.create({
            name: 'UPDATE_CONTACT_TYPE',
            active: true
        });

        return await adminRole.addPermissions([readContactTypePermission, updateContactTypePermission]);
    },

    down: async (queryInterface, Sequelize) => {
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['READ_CONTACT_TYPE', 'UPDATE_CONTACT_TYPE']
                }
            }
        });
    }
};
