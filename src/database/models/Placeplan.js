'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlacePlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Career, {foreignKey: 'careerId'});
      this.belongsTo(models.IncomeSource, {foreignKey: 'incomeSourceId'});
      this.belongsTo(models.EducationCenter, {foreignKey: 'educationCenter'});
      this.belongsTo(models.Province, {foreignKey: 'provinceId'});
    }
  };
  PlacePlan.init({
    careerId: DataTypes.INTEGER, //field SIGIES
    incomeSourceId: DataTypes.INTEGER, //field SIGIES
    gender: DataTypes.STRING, //field SIGIES
    modality: DataTypes.STRING, //field SIGIES
    educationCenter: DataTypes.INTEGER, //field SIGIES
    prosecutionID: DataTypes.INTEGER, //field SIGIES
    convocationID: DataTypes.INTEGER, //field SIGIES
    schoolYearId: DataTypes.INTEGER, //field SIGIES
    initialCapacity: DataTypes.INTEGER, //field SIGIES
    provinceId: DataTypes.INTEGER, //field SIGIES
    updatedAtSigies: DataTypes.DATE //field SIGIES
  }, {
    sequelize,
    modelName: 'PlacePlan',
  });
  return PlacePlan;
};
