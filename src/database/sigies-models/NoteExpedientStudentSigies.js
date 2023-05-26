'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class NoteExpedientStudentSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.ExpedientStudentSigies, {foreignKey: 'expedient_student_id'});
            this.belongsTo(models.ExaminationSigies, {as: 'examination', foreignKey: 'examination_id'});
            this.belongsTo(models.CommissionSigies, {foreignKey: 'commission_at'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    NoteExpedientStudentSigies.init({
        expedient_student_id: DataTypes.INTEGER,
        examination_id: DataTypes.INTEGER,
        note: DataTypes.DECIMAL(5,2),
        discualified: DataTypes.BOOLEAN,
        commission_at: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'NoteExpedientStudentSigies',
        tableName: 'r_note_expedient_student',
        schema: 'pkt_assignment'
    });
    return NoteExpedientStudentSigies;
};
