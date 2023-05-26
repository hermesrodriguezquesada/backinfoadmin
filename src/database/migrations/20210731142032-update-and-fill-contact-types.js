'use strict';
const {ContactType} = require('../models');
const {contactTypes} = require('../../utils/globalUtils');

const types = [{
    name: 'Teléfono',
    slug: contactTypes.PHONE
}, {
    name: 'Móvil',
    slug: contactTypes.MOBILE
}, {
    name: 'Correo electrónico',
    slug: contactTypes.EMAIL
}, {
    name: 'Web',
    slug: contactTypes.WEB
}, {
    name: 'Dirección',
    slug: contactTypes.ADDRESS
}, {
    name: 'Red Social',
    slug: contactTypes.SOCIAL
}, {
    name: 'Fax',
    slug: contactTypes.FAX
}];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('ContactTypes', 'category', {transaction});
            await queryInterface.addColumn('ContactTypes', 'slug', {type: Sequelize.STRING,}, {transaction});
            await queryInterface.bulkInsert('ContactTypes', types.map(item => {
                item.active = true;
                item.createdAt = new Date();
                item.updatedAt = new Date();
                return item;
            }), {transaction});

            await queryInterface.renameTable('Contacts', 'EducationCenterContacts', {transaction});
            await queryInterface.addColumn('EducationCenterContacts', 'educationCenterId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'EducationCenters',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            }, {transaction});
            await queryInterface.addColumn('EducationCenterContacts', 'subtype', {
                type: Sequelize.INTEGER,
                allowNull: true
            }, {transaction});
            await queryInterface.renameColumn('EducationCenterContacts', 'modelReferenceId', 'category', {transaction});
            await queryInterface.changeColumn('EducationCenterContacts', 'category', {
                type: Sequelize.INTEGER,
                allowNull: false
            }, {transaction});
            await queryInterface.removeColumn('EducationCenterContacts', 'modelReference', {transaction});

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },

    down: async (queryInterface, Sequelize) => {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('EducationCenterContacts', 'educationCenterId', {transaction});
            await queryInterface.removeColumn('EducationCenterContacts', 'subtype', {transaction});
            await queryInterface.changeColumn('EducationCenterContacts', 'category', {
                type: Sequelize.INTEGER,
                allowNull: true
            }, {transaction});
            await queryInterface.renameColumn('EducationCenterContacts', 'category', 'modelReferenceId', {transaction});
            await queryInterface.addColumn('EducationCenterContacts', 'modelReference', {
                type: Sequelize.STRING,
                allowNull: true
            }, {transaction});
            await queryInterface.renameTable('EducationCenterContacts', 'Contacts', {transaction});

            await queryInterface.addColumn('ContactTypes', 'category', {type: Sequelize.INTEGER}, {transaction});
            await queryInterface.removeColumn('ContactTypes', 'slug', {transaction});
            await ContactType.destroy({
                where: {},
                transaction
            });

            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
};
