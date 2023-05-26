'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PreuniversitySigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.StudentSigies, {foreignKey: 'preuniversity_id'});

            this.belongsTo(models.MunicipalitySigies, {foreignKey: 'municipality_id'});
            this.belongsTo(models.ProvinceSigies, {foreignKey: 'province_id'});
            this.belongsTo(models.CommissionSigies, {foreignKey: 'commission_at'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    PreuniversitySigies.init({
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        municipality_id: DataTypes.INTEGER,
        province_id: DataTypes.INTEGER,
        commission_at: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'PreuniversitySigies',
        tableName: 'tb_preuniversity',
        schema: 'pkt_organization'
    });
    return PreuniversitySigies;
};
