'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GenderSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.StudentSigies, {foreignKey: 'sex_type_id'});

            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    GenderSigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'GenderSigies',
        tableName: 'nom_gender',
        schema: 'pkt_encoders'
    });
    return GenderSigies;
};
