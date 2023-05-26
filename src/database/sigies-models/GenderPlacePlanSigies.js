'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GenderPlacePlanSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'gender_id'});

            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    GenderPlacePlanSigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'GenderPlacePlanSigies',
        tableName: 'nom_gender_places_plan',
        schema: 'pkt_encoders'
    });
    return GenderPlacePlanSigies;
};
