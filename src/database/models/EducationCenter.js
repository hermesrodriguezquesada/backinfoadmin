'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EducationCenter extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.Career, {through: 'EducationCenterCareer', foreignKey: 'educationCenterId'});
            this.hasMany(models.EducationCenterContact, {foreignKey: 'educationCenterId'});
            this.hasMany(models.PlacePlan, {foreignKey: 'educationCenter'});
            this.belongsTo(models.Province, {foreignKey: 'provinceId'});
        }
    };
    EducationCenter.init({
        name: DataTypes.STRING, //field SIGIES
        code: DataTypes.STRING, //field SIGIES
        description: DataTypes.TEXT,
        shortDescription: DataTypes.TEXT,
        globalRankingYear: DataTypes.INTEGER,
        globalRanking: DataTypes.INTEGER,
        cubanRankingYear: DataTypes.INTEGER,
        cubanRanking: DataTypes.INTEGER,
        foundationYear: DataTypes.INTEGER,
        logo: DataTypes.STRING,
        image: DataTypes.STRING,
        location: DataTypes.STRING,
        rectorName: DataTypes.STRING,
        rectorImage: DataTypes.STRING,
        provinceId: DataTypes.INTEGER, //field SIGIES
        isCertified: DataTypes.BOOLEAN,
        certificationLevel: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        schoolYearId: DataTypes.INTEGER, //field SIGIES
        updatedAtSigies: DataTypes.DATE //field SIGIES
    }, {
        sequelize,
        modelName: 'EducationCenter',
    });
    return EducationCenter;
};
