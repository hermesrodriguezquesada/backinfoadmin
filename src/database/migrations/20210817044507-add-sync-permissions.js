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

    const createSyncPermission = await Permission.create({
      name: 'CREATE_SYNC',
      active: true
    });

    const getSyncPermission = await Permission.create({
      name: 'GET_SYNC',
      active: true
    });

    return await adminRole.addPermissions([createSyncPermission, getSyncPermission]);
  },

  down: async (queryInterface, Sequelize) => {
    return Permission.destroy({
      where: {
        name: {
          [Op.in]: ['CREATE_SYNC', 'GET_SYNC']
        }
      }
    });
  }
};
