'use strict';
const {Announcement} = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable('Announcements', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                description: {
                    type: Sequelize.TEXT,
                    allowNull: true,
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

            await Announcement.create({
                name: 'Ordinaria',
                active: true,
            }, {transaction});

            await Announcement.create({
                name: 'Extraordinaria',
                active: true,
            }, {transaction});

            await Announcement.create({
                name: 'Especial',
                active: true,
            }, {transaction});

            await queryInterface.addColumn('EntranceExamSchedules', 'announcementId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Announcements',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
            await queryInterface.removeColumn('EntranceExamSchedules', 'announcementId', {transaction});

            await queryInterface.dropTable('Announcements', {transaction});

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
