'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ExaminationSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.NoteExpedientStudentSigies, {foreignKey: 'examination_id'});
            this.hasMany(models.ExaminationReportSigies, {foreignKey: 'examination_id'});

            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ExaminationSigies.init({
        name: DataTypes.STRING,
        short_name: DataTypes.STRING,
        code: DataTypes.STRING,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ExaminationSigies',
        tableName: 'nom_examination',
        schema: 'pkt_encoders'
    });
    return ExaminationSigies;
};
