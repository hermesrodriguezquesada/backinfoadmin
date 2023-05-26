'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MunicipalitySigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.StudentSigies, {foreignKey: 'municipality_id'});
            this.hasMany(models.PreuniversitySigies, {foreignKey: 'municipality_id'});

            this.belongsTo(models.ProvinceSigies, {foreignKey: 'province_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    MunicipalitySigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        province_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'MunicipalitySigies',
        tableName: 'tb_municipality',
        schema: 'pkt_organization'
    });
    return MunicipalitySigies;
};
