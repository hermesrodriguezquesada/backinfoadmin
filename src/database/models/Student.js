'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Municipality, {foreignKey: 'municipalityId'});
      this.belongsTo(models.Preuniversity, {foreignKey: 'preuniversityId'});
      this.belongsTo(models.Commission, {foreignKey: 'commissionId'});
      this.belongsTo(models.Province, {foreignKey: 'provinceId'});
      this.belongsTo(models.IncomeSource, {foreignKey: 'incomeSourceId'});
    }
  };
  Student.init({
    name: DataTypes.STRING, //field SIGIES
    lastName: DataTypes.STRING, //field SIGIES
    ci: DataTypes.STRING, //field SIGIES
    provinceId: DataTypes.INTEGER, //field SIGIES
    municipalityId: DataTypes.STRING, //field SIGIES
    incomeSourceId: DataTypes.INTEGER, //field SIGIES
    preuniversityId: DataTypes.STRING, //field SIGIES
    commissionId: DataTypes.STRING, //field SIGIES
    applications: DataTypes.JSON, //field SIGIES
    notes: DataTypes.JSON, //field SIGIES
    assignations: DataTypes.JSON, //field SIGIES
    schoolYearId: DataTypes.INTEGER, //field SIGIES
    updatedAtSigies: DataTypes.DATE //field SIGIES
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};
