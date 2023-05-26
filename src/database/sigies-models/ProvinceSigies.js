'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProvinceSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.CesSigies, {foreignKey: 'province_id'});
            this.hasMany(models.MunicipalitySigies, {foreignKey: 'province_id'});
            this.hasMany(models.StudentSigies, {foreignKey: 'province_id'});
            this.hasMany(models.PreuniversitySigies, {foreignKey: 'province_id'});
            this.hasMany(models.PlacePlanSigies, {foreignKey: 'province_id'});
            this.hasMany(models.TerritorialLinkSigies, {foreignKey: 'province_id'});

            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ProvinceSigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'ProvinceSigies',
        tableName: 'tb_province',
        schema: 'pkt_organization'
    });
    return ProvinceSigies;
};
