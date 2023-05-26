'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SchoolYearSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.ApplicationSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.CareerApplicationSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.CareerSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.CesSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.CommissionSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ConvocationSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ExaminationSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ExpedientStudentSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.GenderSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.GenderPlacePlanSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.IncomeSourceSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ModalitySigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.MunicipalitySigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.NoteExpedientStudentSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.PlacePlanSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.PreuniversitySigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ProsecutionSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ProvinceSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ScienceAreaSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.StudentSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.TerritorialLinkSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ExaminationReportSigies, {foreignKey: 'school_year_at'});
            this.hasMany(models.ExaminationReportApplicationSigies, {foreignKey: 'school_year_at'});

            this.belongsTo(models.NomStateSigies, {foreignKey: 'state_id'});
        }
    };
    SchoolYearSigies.init({
        state_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'SchoolYearSigies',
        tableName: 'tb_school_year',
        schema: 'pkt_arq_base'
    });
    return SchoolYearSigies;
};
