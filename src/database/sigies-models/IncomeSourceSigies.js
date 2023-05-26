'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class IncomeSourceSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'income_source_id'});
            this.hasMany(models.StudentSigies, {foreignKey: 'income_source_id'});

            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
            this.belongsTo(models.ModalitySigies, {foreignKey: 'modality_type_id'});
        }
    };
    IncomeSourceSigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        modality_type_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'IncomeSourceSigies',
        tableName: 'nom_income_source',
        schema: 'pkt_encoders'
    });
    return IncomeSourceSigies;
};
