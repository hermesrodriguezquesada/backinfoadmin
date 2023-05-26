'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Contact extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.ContactType, {foreignKey: 'contactTypeId'});
        }
    };
    Contact.init({
        contactTypeId: DataTypes.INTEGER,
        value: DataTypes.STRING,
        category: DataTypes.INTEGER,
        subtype: DataTypes.INTEGER,
        active: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Contact',
        tableName: 'Contacts',
    });
    return Contact;
};