'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CesSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'ces_id'});
            this.hasMany(models.ExpedientStudentSigies, {foreignKey: 'ces_id'});
            this.hasMany(models.TerritorialLinkSigies, {foreignKey: 'ces_id'});

            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
            this.belongsTo(models.ProvinceSigies, {foreignKey: 'province_id'});
        }
    };
    CesSigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        province_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'CesSigies',
        tableName: 'tb_ces',
        schema: 'pkt_organization'
    });
    return CesSigies;
};
