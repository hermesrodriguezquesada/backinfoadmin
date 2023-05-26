'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ContactType extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.EducationCenterContact, {foreignKey: 'contactTypeId'});
        }
    };
    ContactType.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        slug: DataTypes.STRING,
        active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'ContactType',
    });
    return ContactType;
};