'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EntranceExamSchedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Subject, {foreignKey: 'subjectId'});
            this.belongsTo(models.Announcement, {foreignKey: 'announcementId'});
        }
    };
    EntranceExamSchedule.init({
        subjectId: DataTypes.INTEGER,
        announcementId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'EntranceExamSchedule',
    });
    return EntranceExamSchedule;
};
