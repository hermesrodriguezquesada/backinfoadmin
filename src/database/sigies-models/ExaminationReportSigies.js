'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ExaminationReportSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.ExaminationReportApplicationSigies, {foreignKey: 'examination_report_id'});

            this.belongsTo(models.ExaminationSigies, {foreignKey: 'examination_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ExaminationReportSigies.init({
        examination_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ExaminationReportSigies',
        tableName: 'tb_examination_report',
        schema: 'pkt_test'
    });
    return ExaminationReportSigies;
};
