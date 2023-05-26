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

        const createPermission = await Permission.create({
            name: 'CREATE_TELECLASS_SCHEDULE',
            active: true
        });

        const readPermission = await Permission.create({
            name: 'READ_TELECLASS_SCHEDULE',
            active: true
        });

        const updatePermission = await Permission.create({
            name: 'UPDATE_TELECLASS_SCHEDULE',
            active: true
        });

        const deletePermission = await Permission.create({
            name: 'DELETE_TELECLASS_SCHEDULE',
            active: true
        });

        return await adminRole.addPermissions([createPermission, readPermission, updatePermission, deletePermission]);
    },

    down: async (queryInterface, Sequelize) => {
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['CREATE_TELECLASS_SCHEDULE', 'READ_TELECLASS_SCHEDULE', 'UPDATE_TELECLASS_SCHEDULE', 'DELETE_TELECLASS_SCHEDULE']
                }
            }
        });
    }
};
