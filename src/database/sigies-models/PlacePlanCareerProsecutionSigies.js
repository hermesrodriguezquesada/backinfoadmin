'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PlacePlanCareerProsecutionSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.PlacePlanSigies, {as: 'place_plan', foreignKey: 'places_plan_id'});
            this.belongsTo(models.CareerSigies, {foreignKey: 'career'});
            this.belongsTo(models.IncomeSourceSigies, {foreignKey: 'income_source_id'});
            this.belongsTo(models.GenderPlacePlanSigies, {as: 'gender', foreignKey: 'gender_id'});
            this.belongsTo(models.ModalitySigies, {as: 'modality', foreignKey: 'modality_id'});
            this.belongsTo(models.CesSigies, {foreignKey: 'ces_id'});
            this.belongsTo(models.ProsecutionSigies, {foreignKey: 'prosecution_at'});
            this.belongsTo(models.ConvocationSigies, {foreignKey: 'convocation_at'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    PlacePlanCareerProsecutionSigies.init({
        places_plan_id: DataTypes.INTEGER,
        career: DataTypes.INTEGER,
        income_source_id: DataTypes.INTEGER,
        gender_id: DataTypes.INTEGER,
        modality_id: DataTypes.INTEGER,
        ces_id: DataTypes.INTEGER,
        initial_capacity: DataTypes.INTEGER,
        cut_average: DataTypes.DECIMAL(5,2),
        prosecution_at: DataTypes.INTEGER,
        convocation_at: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'PlacePlanCareerProsecutionSigies',
        tableName: 'r_places_plan_career_prosecution',
        schema: 'pkt_organization'
    });
    return PlacePlanCareerProsecutionSigies;
};
