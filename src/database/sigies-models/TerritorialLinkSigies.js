'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class TerritorialLinkSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.ProvinceSigies, {foreignKey: 'province_id'});
            this.belongsTo(models.ModalitySigies, {foreignKey: 'modality_id'});
            this.belongsTo(models.CesSigies, {foreignKey: 'ces_id'});
            this.belongsTo(models.CareerSigies, {foreignKey: 'career_id'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    TerritorialLinkSigies.init({
        ces_id: DataTypes.INTEGER,
        career_id: DataTypes.INTEGER,
        province_id: DataTypes.INTEGER,
        modality_id: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'TerritorialLinkSigies',
        tableName: 'tb_territorial_link',
        schema: 'pkt_organization'
    });
    return TerritorialLinkSigies;
};
