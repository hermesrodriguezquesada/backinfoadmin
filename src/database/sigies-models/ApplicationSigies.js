'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ApplicationSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.CareerApplicationSigies, {as: 'career_application',foreignKey: 'application_id'});
            this.hasMany(models.ExaminationReportApplicationSigies, {foreignKey: 'application_id'});

            this.belongsTo(models.StudentSigies, {foreignKey: 'commission_at'});
            this.belongsTo(models.CommissionSigies, {foreignKey: 'commission_at'});
            this.belongsTo(models.ProsecutionSigies, {foreignKey: 'prosecution_at'});
            this.belongsTo(models.ConvocationSigies, {foreignKey: 'convocation_at'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ApplicationSigies.init({
        student_id: DataTypes.INTEGER,
        commission_at: DataTypes.INTEGER,
        prosecution_at: DataTypes.INTEGER,
        convocation_at: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ApplicationSigies',
        tableName: 'tb_application',
        schema: 'pkt_organization'
    });
    return ApplicationSigies;
};
