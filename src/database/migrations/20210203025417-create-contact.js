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
            ContactTypeId: {
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
                type: Sequelize.STRING
            },
            modelReference: {
                type: Sequelize.STRING
            },
            modelReferenceId: {
                type: Sequelize.INTEGER
            },
            active: {
                type: Sequelize.BOOLEAN
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
