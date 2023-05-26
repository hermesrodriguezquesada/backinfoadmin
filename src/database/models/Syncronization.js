'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Syncronization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId'});
    }
  };
  Syncronization.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    result: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Syncronization',
  });
  return Syncronization;
};
