'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class News extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Section, {foreignKey: 'sectionId'})
        }
    };
    News.init({
        sectionId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'News',
    });
    return News;
};
