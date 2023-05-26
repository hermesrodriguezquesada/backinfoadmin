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

        const createUserPermission = await Permission.create({
            name: 'CREATE_USER',
            active: true
        });

        const readUserPermission = await Permission.create({
            name: 'READ_USER',
            active: true
        });

        const updateUserPermission = await Permission.create({
            name: 'UPDATE_USER',
            active: true
        });

        const deleteUserPermission = await Permission.create({
            name: 'DELETE_USER',
            active: true
        });

        return await adminRole.addPermissions([createUserPermission, readUserPermission, updateUserPermission, deleteUserPermission]);
    },

    down: async (queryInterface, Sequelize) => {
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['CREATE_USER', 'READ_USER', 'UPDATE_USER', 'DELETE_USER']
                }
            }
        });
    }
};
