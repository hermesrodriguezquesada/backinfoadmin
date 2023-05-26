'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Contacts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contactTypeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ContactTypes',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            value: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            category: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            subtype: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Contacts');
    }
};
