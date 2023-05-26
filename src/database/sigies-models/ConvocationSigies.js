'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ConvocationSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'convocation_at'});
            this.hasMany(models.ApplicationSigies, {foreignKey: 'convocation_at'});
            this.hasMany(models.CareerApplicationSigies, {foreignKey: 'convocation_at'});

            this.belongsTo(models.NomStateSigies, {foreignKey: 'state_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ConvocationSigies.init({
        name: DataTypes.STRING,
        state_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ConvocationSigies',
        tableName: 'nom_convocation',
        schema: 'pkt_encoders'
    });
    return ConvocationSigies;
};
