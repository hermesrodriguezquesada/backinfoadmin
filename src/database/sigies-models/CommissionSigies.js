'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CommissionSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.StudentSigies, {foreignKey: 'commission_at'});
            this.hasMany(models.PreuniversitySigies, {foreignKey: 'commission_at'});
            this.hasMany(models.ExpedientStudentSigies, {foreignKey: 'commission_at'});
            this.hasMany(models.ApplicationSigies, {foreignKey: 'commission_at'});
            this.hasMany(models.CareerApplicationSigies, {foreignKey: 'commission_at'});
            this.hasMany(models.NoteExpedientStudentSigies, {foreignKey: 'commission_at'});

            this.belongsTo(models.ProvinceSigies, {foreignKey: 'province_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    CommissionSigies.init({
        name: DataTypes.STRING,
        province_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'CommissionSigies',
        tableName: 'tb_commission',
        schema: 'pkt_arq_base'
    });
    return CommissionSigies;
};
