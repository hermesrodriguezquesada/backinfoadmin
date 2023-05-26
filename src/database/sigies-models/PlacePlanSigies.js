'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PlacePlanSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'place_plan_id'});

            this.belongsTo(models.ProvinceSigies, {as: 'province', foreignKey: 'province_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    PlacePlanSigies.init({
        province_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'PlacePlanSigies',
        tableName: 'tb_places_plan',
        schema: 'pkt_organization'
    });
    return PlacePlanSigies;
};
