'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TeleclassSchedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Subject, {foreignKey: 'subjectId'});
            this.belongsTo(models.Channel, {foreignKey: 'channelId'});
        }
    };
    TeleclassSchedule.init({
        subjectId: DataTypes.INTEGER,
        channelId: DataTypes.INTEGER,
        frequency: DataTypes.STRING,
        time: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'TeleclassSchedule',
    });
    return TeleclassSchedule;
};
