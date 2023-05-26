'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.User, {foreignKey: 'roleId'});
            this.belongsToMany(models.Permission, {through: 'RolePermissions', foreignKey: 'roleId'});
        }
    };
    Role.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        active: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'Role',
    });
    return Role;
};