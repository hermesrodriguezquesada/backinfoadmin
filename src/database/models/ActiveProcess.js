'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActiveProcess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ActiveProcess.init({
    schoolYearId: DataTypes.INTEGER,
    convocationId: DataTypes.INTEGER,
    prosecutionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ActiveProcess',
  });
  return ActiveProcess;
};