'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProsecutionSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'prosecution_at'});
            this.hasMany(models.ApplicationSigies, {foreignKey: 'prosecution_at'});
            this.hasMany(models.CareerApplicationSigies, {foreignKey: 'prosecution_at'});

            this.belongsTo(models.NomStateSigies, {foreignKey: 'state_id'});
            this.belongsTo(models.ConvocationSigies, {foreignKey: 'nomconvocation_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ProsecutionSigies.init({
        name: DataTypes.STRING,
        state_id: DataTypes.INTEGER,
        nomconvocation_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ProsecutionSigies',
        tableName: 'tb_prosecution',
        schema: 'pkt_assignment'
    });
    return ProsecutionSigies;
};
