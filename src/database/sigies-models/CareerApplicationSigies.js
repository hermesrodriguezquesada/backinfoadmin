'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CareerApplicationSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.ApplicationSigies, {foreignKey: 'application_id'});
            this.belongsTo(models.CareerSigies, {as: 'career', foreignKey: 'career_type_id'});
            this.belongsTo(models.ModalitySigies, {as: 'modality', foreignKey: 'nom_modality_type_id'});
            this.belongsTo(models.CommissionSigies, {foreignKey: 'commission_at'});
            this.belongsTo(models.ProsecutionSigies, {foreignKey: 'prosecution_at'});
            this.belongsTo(models.ConvocationSigies, {foreignKey: 'convocation_at'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    CareerApplicationSigies.init({
        application_id: DataTypes.INTEGER,  //solicitud
        career_type_id: DataTypes.INTEGER,  //carrera
        nom_modality_type_id: DataTypes.INTEGER, //modalidad
        order_career: DataTypes.INTEGER, //orden de la carrera solicitada
        commission_at: DataTypes.INTEGER,
        prosecution_at: DataTypes.INTEGER,
        convocation_at: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'CareerApplicationSigies',
        tableName: 'r_career_application',
        schema: 'pkt_organization'
    });
    return CareerApplicationSigies;
};
