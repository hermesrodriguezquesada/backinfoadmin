'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StudentSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.ExpedientStudentSigies, {as: 'expedient', foreignKey: 'student_id'});
            this.hasMany(models.ApplicationSigies, {as: 'application', foreignKey: 'student_id'});

            this.belongsTo(models.MunicipalitySigies, {foreignKey: 'municipality_id'});
            this.belongsTo(models.ProvinceSigies, {foreignKey: 'province_id'});
            this.belongsTo(models.IncomeSourceSigies, {foreignKey: 'income_source_id'});
            this.belongsTo(models.GenderSigies, {foreignKey: 'sex_type_id'});
            this.belongsTo(models.PreuniversitySigies, {foreignKey: 'preuniversity_id'});
            this.belongsTo(models.CommissionSigies, {foreignKey: 'commission_at'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    StudentSigies.init({
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        ci: DataTypes.STRING,
        academic_index: DataTypes.DECIMAL(5,2),
        address: DataTypes.TEXT,
        municipality_id: DataTypes.INTEGER, //Municipio de residencia
        province_id: DataTypes.INTEGER, //Provincia de residencia
        income_source_id: DataTypes.INTEGER, //vía de ingreso
        sex_type_id: DataTypes.INTEGER, //género
        preuniversity_id: DataTypes.INTEGER, //centro de procedencia
        commission_at: DataTypes.INTEGER, //Comisión de ingreso que registra al estudiante
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'StudentSigies',
        tableName: 'tb_student',
        schema: 'pkt_organization'
    });
    return StudentSigies;
};
