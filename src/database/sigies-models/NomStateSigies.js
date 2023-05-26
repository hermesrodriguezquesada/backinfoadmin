'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NomStateSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.SchoolYearSigies, {foreignKey: 'state_id'});
            this.hasMany(models.ConvocationSigies, {foreignKey: 'state_id'});
            this.hasMany(models.ProsecutionSigies, {foreignKey: 'state_id'});
        }
    };
    NomStateSigies.init({
        name: DataTypes.STRING,
        type: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'NomStateSigies',
        tableName: 'nom_state',
        schema: 'pkt_arq_base'
    });
    return NomStateSigies;
};
