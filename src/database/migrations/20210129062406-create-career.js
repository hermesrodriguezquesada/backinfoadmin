'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Careers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            code: {
                type: Sequelize.STRING
            },
            short_description: {
                type: Sequelize.TEXT
            },
            description: {
                type: Sequelize.TEXT
            },
            teachingFramework: {
                type: Sequelize.STRING
            },
            scienceAreaId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'ScienceAreas',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
        await queryInterface.dropTable('Careers');
    }
};
