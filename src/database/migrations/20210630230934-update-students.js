'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Students', 'municipalityId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Municipalities',
                key: 'id'
            },
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addColumn('Students', 'commissionId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Commissions',
                key: 'id'
            },
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.addColumn('Students', 'preuniversityId', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Preuniversities',
                key: 'id'
            },
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        });

        await queryInterface.sequelize.query(`update "Students" set "municipalityId" = municipality::numeric where municipality::numeric in (select m.id from "Municipalities" as m);`);
        await queryInterface.sequelize.query(`update "Students" set "commissionId" = commision::numeric where commision::numeric in (select m.id from "Commissions" as m);`);
        return await queryInterface.sequelize.query(`update "Students" set "preuniversityId" = preuniversity::numeric where preuniversity::numeric in (select m.id from "Preuniversities" as m);`);

        /*await queryInterface.removeColumn('Students', 'municipality');
        await queryInterface.removeColumn('Students', 'commision');
        return await queryInterface.removeColumn('Students', 'preuniversity');*/
    },

    down: async (queryInterface, Sequelize) => {
        /*await queryInterface.addColumn('Students', 'municipality', {type: Sequelize.STRING});
        await queryInterface.addColumn('Students', 'commision', {type: Sequelize.STRING});
        await queryInterface.addColumn('Students', 'preuniversity', {type: Sequelize.STRING});

        await queryInterface.sequelize.query(`update "Students" set "municipality" = "municipalityId" where "municipalityId" is not null;`);
        await queryInterface.sequelize.query(`update "Students" set "commision" = "commissionId" where "commissionId" is not null;`);
        await queryInterface.sequelize.query(`update "Students" set "preuniversity" = "preuniversityId" where "preuniversityId" is not null;`);*/

        await queryInterface.removeColumn('Students', 'municipalityId');
        await queryInterface.removeColumn('Students', 'commissionId');
        return await queryInterface.removeColumn('Students', 'preuniversityId');
    }
};
