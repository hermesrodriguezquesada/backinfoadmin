'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ExpedientStudentSigies extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.NoteExpedientStudentSigies, {as: 'note_expedient', foreignKey: 'expedient_student_id'});


            this.belongsTo(models.StudentSigies, {foreignKey: 'student_id'});
            this.belongsTo(models.CareerSigies, {as: 'career', foreignKey: 'career_id'});
            this.belongsTo(models.CesSigies, {as: 'ces', foreignKey: 'ces_id'});
            this.belongsTo(models.ModalitySigies, {as: 'modality', foreignKey: 'modality_id'});
            this.belongsTo(models.MilitaryServiceSigies, {as: 'military', foreignKey: 'military_service_id'});
            this.belongsTo(models.CommissionSigies, {foreignKey: 'commission_at'});
            this.belongsTo(models.SchoolYearSigies, {foreignKey: 'school_year_at'});
        }
    };
    ExpedientStudentSigies.init({
        student_id: DataTypes.INTEGER,
        career_id: DataTypes.INTEGER, //este campo se llena solo cuando se le asignó una carrera al estudiante
        ces_id: DataTypes.INTEGER, //este campo se llena solo cuando se le asignó una carrera al estudiante
        modality_id: DataTypes.INTEGER,
        order_career: DataTypes.INTEGER, //indica el numero de orden de la carrera solicitada
        military_service_id: DataTypes.INTEGER, //si la carrera es diferida o no
        average: DataTypes.DECIMAL(5,2),
        commission_at: DataTypes.INTEGER,
        school_year_at: DataTypes.INTEGER,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    }, {
        sequelize,
        modelName: 'ExpedientStudentSigies',
        tableName: 'tb_expedient_student',
        schema: 'pkt_assignment'
    });
    return ExpedientStudentSigies;
};
