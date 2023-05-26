'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('EntranceExamSchedules', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                subjectId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Subjects',
                        key: 'id'
                    },
                    allowNull: false,
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                active: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }, {transaction});

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    down: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.dropTable('EntranceExamSchedules');

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
