'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProvincialCommissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING
            },
            active: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ProvincialCommissions');
    }
};
