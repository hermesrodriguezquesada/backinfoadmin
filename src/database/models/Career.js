'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Career extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsToMany(models.EducationCenter, {through: 'EducationCenterCareer', foreignKey: 'careerId'});
            this.hasMany(models.PlacePlan, {foreignKey: 'careerId'});
            this.belongsTo(models.ScienceArea, {foreignKey: 'scienceAreaId'});
        }
    };
    Career.init({
        name: DataTypes.STRING, //field SIGIES
        code: DataTypes.STRING, //field SIGIES
        description: DataTypes.TEXT,
        shortDescription: DataTypes.TEXT,
        teachingFramework: DataTypes.STRING,
        scienceAreaId: DataTypes.INTEGER, //field SIGIES
        active: DataTypes.BOOLEAN,
        schoolYearId: DataTypes.INTEGER, //field SIGIES
        updatedAtSigies: DataTypes.DATE, //field SIGIES
        studyPlan: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Career'
    });
    return Career;
};
