'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProvincialCommission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    ProvincialCommission.init({
        name: DataTypes.STRING,
        phone: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'ProvincialCommission',
        tableName: 'ProvincialCommissions',
    });
    return ProvincialCommission;
};