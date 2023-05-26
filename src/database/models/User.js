'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Syncronization, {foreignKey: 'userId'});
            this.belongsTo(models.Role, {foreignKey: 'roleId'});
        }
    };
    User.init({
        roleId: DataTypes.INTEGER,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        active: DataTypes.BOOLEAN,
        isSuperUser: DataTypes.BOOLEAN,
    }, {
        hooks: {
            beforeSave: async (user, options) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        },
        sequelize,
        modelName: 'User',
    });
    return User;
};
