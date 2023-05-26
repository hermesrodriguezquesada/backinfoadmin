'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ModalitySigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.IncomeSourceSigies, {foreignKey: 'modality_type_id'});
            this.hasMany(models.PlacePlanCareerProsecutionSigies, {foreignKey: 'modality_id'});
            this.hasMany(models.ExpedientStudentSigies, {foreignKey: 'modality_id'});
            this.hasMany(models.CareerApplicationSigies, {foreignKey: 'nom_modality_type_id'});
            this.hasMany(models.TerritorialLinkSigies, {foreignKey: 'modality_id'});

            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ModalitySigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'ModalitySigies',
        tableName: 'nom_modality',
        schema: 'pkt_encoders'
    });
    return ModalitySigies;
};
