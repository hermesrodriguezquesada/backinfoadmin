'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Channel extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.TeleclassSchedule, {foreignKey: 'channelId'});
        }
    };
    Channel.init({
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Channel',
    });
    return Channel;
};
