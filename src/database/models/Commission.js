'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Commission extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Student, {foreignKey: 'commissionId'});
            this.belongsTo(models.Province, {foreignKey: 'provinceId'});
        }
    };
    Commission.init({
        name: DataTypes.STRING, //field SIGIES
        provinceId: DataTypes.INTEGER, //field SIGIES
        schoolYearId: DataTypes.INTEGER, //field SIGIES
        updatedAtSigies: DataTypes.DATE, //field SIGIES
    }, {
        sequelize,
        modelName: 'Commission',
    });
    return Commission;
};