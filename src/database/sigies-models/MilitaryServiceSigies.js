'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MilitaryServiceSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.ExpedientStudentSigies, {foreignKey: 'military_service_id'});
        }
    };
    MilitaryServiceSigies.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'MilitaryServiceSigies',
        tableName: 'nom_military_service',
        schema: 'pkt_assignment'
    });
    return MilitaryServiceSigies;
};
