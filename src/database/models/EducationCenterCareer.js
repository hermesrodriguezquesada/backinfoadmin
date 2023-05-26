'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EducationCenterCareer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    EducationCenterCareer.init({
        isCertified: DataTypes.BOOLEAN,
        certificationLevel: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'EducationCenterCareer',
        tableName: 'EducationCenterCareer',
    });
    return EducationCenterCareer;
};