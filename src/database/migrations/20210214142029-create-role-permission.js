'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('RolePermissions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            RoleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Roles',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            PermissionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Permissions',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
                    fields: ["RoleId", "PermissionId"]
                }
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('RolePermissions');
    }
};
