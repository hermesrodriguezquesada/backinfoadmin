'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('EducationCenterCareer', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            CareerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Careers',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            EducationCenterId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'EducationCenters',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            isCertified: {
                type: Sequelize.BOOLEAN
            },
            certificationLevel: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            uniqueKeys: {
                unique_tag: {
                    customIndex: true,
                    fields: ["CareerId", "EducationCenterId"]
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('EducationCenterCareer');
    }
};
