'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ScienceArea extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Career, {foreignKey: 'scienceAreaId'})
        }
    };
    ScienceArea.init({
        name: DataTypes.STRING, //field SIGIES
        code: DataTypes.STRING, //field SIGIES
        schoolYearId: DataTypes.INTEGER, //field SIGIES
        updatedAtSigies: DataTypes.DATE //field SIGIES
    }, {
        sequelize,
        modelName: 'ScienceArea',
    });
    return ScienceArea;
};
