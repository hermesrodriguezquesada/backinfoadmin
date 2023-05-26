'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CareerSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'career'});
            this.hasMany(models.ExpedientStudentSigies, {foreignKey: 'career_id'});
            this.hasMany(models.CareerApplicationSigies, {foreignKey: 'career_type_id'});
            this.hasMany(models.TerritorialLinkSigies, {foreignKey: 'career_id'});

            this.belongsTo(models.ScienceAreaSigies, {foreignKey: 'science_area_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    CareerSigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        science_area_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        cut_average: DataTypes.DECIMAL(5, 2),
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'CareerSigies',
        tableName: 'nom_career',
        schema: 'pkt_encoders'
    });
    return CareerSigies;
};
