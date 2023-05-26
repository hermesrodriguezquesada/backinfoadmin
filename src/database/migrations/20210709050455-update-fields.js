'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Users', 'RoleId', 'roleId');
        await queryInterface.renameColumn('RolePermissions', 'RoleId', 'roleId');
        await queryInterface.renameColumn('RolePermissions', 'PermissionId', 'permissionId');
        await queryInterface.renameColumn('News', 'SectionId', 'sectionId');
        await queryInterface.renameColumn('EducationCenterCareer', 'CareerId', 'careerId');
        await queryInterface.renameColumn('EducationCenterCareer', 'EducationCenterId', 'educationCenterId');
        return await queryInterface.renameColumn('Contacts', 'ContactTypeId', 'contactTypeId');
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.renameColumn('Users', 'roleId', 'RoleId');
        await queryInterface.renameColumn('RolePermissions', 'roleId', 'RoleId');
        await queryInterface.renameColumn('RolePermissions', 'permissionId', 'PermissionId');
        await queryInterface.renameColumn('News', 'sectionId', 'SectionId');
        await queryInterface.renameColumn('EducationCenterCareer', 'careerId', 'CareerId');
        await queryInterface.renameColumn('EducationCenterCareer', 'educationCenterId', 'EducationCenterId');
        return await queryInterface.renameColumn('Contacts', 'contactTypeId', 'ContactTypeId');
    }
};
