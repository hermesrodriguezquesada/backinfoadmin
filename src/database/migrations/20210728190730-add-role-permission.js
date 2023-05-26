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

        const createRolePermission = await Permission.create({
            name: 'CREATE_ROLE',
            active: true
        });

        const readRolePermission = await Permission.create({
            name: 'READ_ROLE',
            active: true
        });

        const updateRolePermission = await Permission.create({
            name: 'UPDATE_ROLE',
            active: true
        });

        const deleteRolePermission = await Permission.create({
            name: 'DELETE_ROLE',
            active: true
        });

        return await adminRole.addPermissions([createRolePermission, readRolePermission, updateRolePermission, deleteRolePermission]);
    },

    down: async (queryInterface, Sequelize) => {
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['CREATE_ROLE', 'READ_ROLE', 'UPDATE_ROLE', 'DELETE_ROLE']
                }
            }
        });
    }
};
