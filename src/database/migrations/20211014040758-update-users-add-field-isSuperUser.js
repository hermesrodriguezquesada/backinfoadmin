'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'isSuperUser', { type: Sequelize.BOOLEAN });

    const passwordHash = bcrypt.hashSync('1234', 10);

    await queryInterface.bulkInsert('Users', [{
      roleId: 1,
      firstName: 'ADMINISTRADOR',
      lastName: 'ADMINISTRADOR',
      email: 'admin@gmail.com',
      password: passwordHash,
      active: true,
      isSuperUser: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'isSuperUser');
  }
};
