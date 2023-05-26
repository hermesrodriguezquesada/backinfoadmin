'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class EducationCenterContact extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.EducationCenter, {foreignKey: 'educationCenterId'});
            this.belongsTo(models.ContactType, {foreignKey: 'contactTypeId'});
        }
    };
    EducationCenterContact.init({
        educationCenterId: DataTypes.INTEGER,
        contactTypeId: DataTypes.INTEGER,
        value: DataTypes.STRING,
        category: DataTypes.INTEGER,
        subtype: DataTypes.INTEGER,
        active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'EducationCenterContact',
        tableName: 'EducationCenterContacts',
    });
    return EducationCenterContact;
};