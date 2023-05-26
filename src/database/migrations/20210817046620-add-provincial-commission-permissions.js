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

        const createProvincialCommissionPermission = await Permission.create({
            name: 'CREATE_PROVINCIAL_COMMISSION',
            active: true
        });

        const readProvincialCommissionPermission = await Permission.create({
            name: 'READ_PROVINCIAL_COMMISSION',
            active: true
        });

        const updateProvincialCommissionPermission = await Permission.create({
            name: 'UPDATE_PROVINCIAL_COMMISSION',
            active: true
        });

        const deleteProvincialCommissionPermission = await Permission.create({
            name: 'DELETE_PROVINCIAL_COMMISSION',
            active: true
        });

        return await adminRole.addPermissions([createProvincialCommissionPermission, readProvincialCommissionPermission, updateProvincialCommissionPermission, deleteProvincialCommissionPermission]);
    },

    down: async (queryInterface, Sequelize) => {
        return Permission.destroy({
            where: {
                name: {
                    [Op.in]: ['CREATE_PROVINCIAL_COMMISSION', 'READ_PROVINCIAL_COMMISSION', 'UPDATE_PROVINCIAL_COMMISSION', 'DELETE_PROVINCIAL_COMMISSION']
                }
            }
        });
    }
};
