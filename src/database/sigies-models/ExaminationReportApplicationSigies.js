'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ExaminationReportApplicationSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.ApplicationSigies, {foreignKey: 'application_id'});
            this.belongsTo(models.ExaminationReportSigies, {foreignKey: 'examination_report_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ExaminationReportApplicationSigies.init({
        note: DataTypes.DOUBLE,
        reclamation1_note: DataTypes.DOUBLE,
        reclamation2_note: DataTypes.DOUBLE,
        application_id: DataTypes.INTEGER,
        examination_report_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ExaminationReportApplicationSigies',
        tableName: 'r_examination_report_application',
        schema: 'pkt_test'
    });
    return ExaminationReportApplicationSigies;
};
