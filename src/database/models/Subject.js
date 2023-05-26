'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subject extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.TeleclassSchedule, {foreignKey: 'subjectId'});
            this.hasMany(models.EntranceExamSchedule, {foreignKey: 'subjectId'});
        }
    };
    Subject.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        slug: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Subject',
    });
    return Subject;
};
