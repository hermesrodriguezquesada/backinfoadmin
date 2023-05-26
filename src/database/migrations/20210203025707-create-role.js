const Sequelize = require('sequelize');

module.exports = {
up: async (queryInterface, Sequelize) => {
const DataTypes = Sequelize.DataTypes;
await queryInterface.createTable('Roles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    active: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });
  
  await queryInterface.bulkInsert('Roles', [
    {
      name: 'Admin',
      description: 'Administrator',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
},

down: async (queryInterface, Sequelize) => {
await queryInterface.dropTable('Roles');
}
};  