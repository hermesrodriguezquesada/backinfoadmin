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

        const createContactPermission = await Permission.create({
            name: 'CREATE_CONTACT',
            active: true
        });

        const readContactPermission = await Permission.create({
            name: 'READ_CONTACT',
            active: true
        });

        const updateContactPermission = await Permission.create({
            name: 'UPDATE_CONTACT',
            active: true
        });

        const deleteContactPermission = await Permission.create({
            name: 'DELETE_CONTACT',
            active: true
        });

        return await adminRole.addPermissions([createContactPermission, readContactPermission, updateContactPermission, deleteContactPermission]);
    },

    down: async (queryInterface, Sequelize) => {
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['CREATE_CONTACT', 'READ_CONTACT', 'UPDATE_CONTACT', 'DELETE_CONTACT']
                }
            }
        });
    }
};
