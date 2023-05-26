const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse} = require('../utils/globalUtils');
const {ActiveProcess} = require('../database/models');
const {Op} = require("sequelize");
const {
    CareerSigies,
    NomStateSigies,
    SchoolYearSigies,
    ConvocationSigies,
    CommissionSigies,
    ProvinceSigies,
    IncomeSourceSigies,
    CesSigies,
    PlacePlanSigies,
    GenderSigies,
    ProsecutionSigies,
    PlacePlanCareerProsecutionSigies,
    ModalitySigies,
    StudentSigies,
    MunicipalitySigies,
    PreuniversitySigies,
    ApplicationSigies,
    CareerApplicationSigies,
    ExpedientStudentSigies,
    MilitaryServiceSigies,
    ExaminationSigies,
    NoteExpedientStudentSigies,
    ScienceAreaSigies
} = require('../database/sigies-models');


const getSchoolYears = async (req, res) => {
    const data = await SchoolYearSigies.findAll({
        attributes: ['id', 'name', 'state_id', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getNomStates = async (req, res) => {
    const data = await NomStateSigies.findAll({
        attributes: ['id', 'name', 'type'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getCareers = async (req, res) => {
    const data = await CareerSigies.findAll({
        attributes: ['id', 'code', 'name', 'science_area_id', 'cut_average', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getConvocations = async (req, res) => {
    const data = await ConvocationSigies.findAll({
        attributes: ['id', 'name', 'state_id', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getCommissions = async (req, res) => {
    const data = await CommissionSigies.findAll({
        attributes: ['id', 'name', 'province_id', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getProvinces = async (req, res) => {
    const data = await ProvinceSigies.findAll({
        attributes: ['id', 'name', 'short_name', 'code', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getIncomeSources = async (req, res) => {
    const data = await IncomeSourceSigies.findAll({
        attributes: ['id', 'name', 'short_name', 'code', 'modality_type_id', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getEducationCenters = async (req, res) => {
    const data = await CesSigies.findAll({
        attributes: ['id', 'name', 'short_name', 'code', 'province_id', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getPlacePlans = async (req, res) => {
    const data = await PlacePlanSigies.findAll({
        attributes: ['id', 'province_id', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getGenders = async (req, res) => {
    const data = await GenderSigies.findAll({
        attributes: ['id', 'name', 'short_name', 'code', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getProsecutions = async (req, res) => {
    const data = await ProsecutionSigies.findAll({
        attributes: ['id', 'name', 'state_id', 'nomconvocation_id', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getPlacePlanCareerProsecutions = async (req, res) => {
    const data = await PlacePlanCareerProsecutionSigies.findAll({
        attributes: ['id', 'places_plan_id', 'career', 'income_source_id', 'gender_id', 'modality_id', 'ces_id', 'initial_capacity', 'cut_average', 'prosecution_at', 'convocation_at', 'school_year_at', 'deleted_at'],
        where: {
            [Op.and]: [
                {school_year_at: 22},
                {deleted_at: {[Op.is]: null}}
            ]
        },
        limit: 100
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getModalities = async (req, res) => {
    const data = await ModalitySigies.findAll({
        attributes: ['id', 'name', 'short_name', 'code', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getStudents = async (req, res) => {
    const data = await StudentSigies.findAll({
        attributes: ['id', 'name', 'lastname', 'ci', 'academic_index', 'address', 'municipality_id', 'province_id', 'income_source_id', 'sex_type_id', 'preuniversity_id', 'commission_at', 'school_year_at', 'deleted_at'],
        where: {
            [Op.and]: [
                {school_year_at: 22},
                {deleted_at: {[Op.is]: null}}
            ]
        },
        limit: 100
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getMunicipalities = async (req, res) => {
    const data = await MunicipalitySigies.findAll({
        attributes: ['id', 'name', 'short_name', 'code', 'province_id', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getPreuniversities = async (req, res) => {
    const data = await PreuniversitySigies.findAll({
        attributes: ['id', 'name', 'municipality_id', 'province_id', 'commission_at', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getApplications = async (req, res) => {
    const data = await ApplicationSigies.findAll({
        attributes: ['id', 'student_id', 'commission_at', 'prosecution_at', 'convocation_at', 'school_year_at', 'deleted_at'],
        where: {
            [Op.and]: [
                {school_year_at: 22},
                {deleted_at: {[Op.is]: null}}
            ]
        },
        limit: 100
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getCareerApplications = async (req, res) => {
    const data = await CareerApplicationSigies.findAll({
        attributes: ['id', 'application_id', 'career_type_id', 'nom_modality_type_id', 'order_career', 'commission_at', 'prosecution_at', 'convocation_at', 'school_year_at', 'deleted_at'],
        where: {
            [Op.and]: [
                {school_year_at: 22},
                {deleted_at: {[Op.is]: null}}
            ]
        },
        limit: 100
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getExpedientStudents = async (req, res) => {
    const data = await ExpedientStudentSigies.findAll({
        attributes: ['id', 'student_id', 'career_id', 'ces_id', 'modality_id', 'order_career', 'military_service_id', 'average', 'commission_at', 'school_year_at', 'deleted_at'],
        where: {
            [Op.and]: [
                {school_year_at: 22},
                {deleted_at: {[Op.is]: null}}
            ]
        },
        limit: 100
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getMilitaryServices = async (req, res) => {
    const data = await MilitaryServiceSigies.findAll({
        attributes: ['id', 'name', 'type', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getExaminations = async (req, res) => {
    const data = await ExaminationSigies.findAll({
        attributes: ['id', 'name', 'short_name', 'code', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getNoteExpedientStudents = async (req, res) => {
    const data = await NoteExpedientStudentSigies.findAll({
        attributes: ['id', 'expedient_student_id', 'examination_id', 'note', 'school_year_at', 'deleted_at'],
        where: {
            [Op.and]: [
                {school_year_at: 22},
                {deleted_at: {[Op.is]: null}}
            ]
        },
        limit: 100
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getScienceAreas = async (req, res) => {
    const data = await ScienceAreaSigies.findAll({
        attributes: ['id', 'name', 'short_name', 'code', 'school_year_at', 'deleted_at'],
    });

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getApplicationStudent = async (req, res) => {
    let data = [];
    const activeProcess = await ActiveProcess.findOne();
    const studentModels = await StudentSigies.findAll({
        attributes: ['id', 'name', 'lastname', 'ci', 'province_id', 'municipality_id', 'income_source_id', 'preuniversity_id', 'commission_at', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
        where: {
            [Op.and]: [
                {province_id: 31},
                {preuniversity_id: 42},
                {school_year_at: 11},
                //{ci: req.params.ci},
                {deleted_at: {[Op.is]: null}}
            ]
        }
    });

    for (const item of studentModels) {
        let itemStudent = {
            name: item.name,
            lastName: item.lastname,
            ci: item.ci,
            provinceId: item.province_id,
            municipality: item.municipality_id,
            incomeSourceId: item.income_source_id,
            preuniversity: item.preuniversity_id,
            commision: item.commission_at
        };

        //Obtener la solicitud de carreras del estudiante
        const application = await ApplicationSigies.findAll({
            attributes: ['id', 'prosecution_at', 'convocation_at', 'school_year_at'],
            where: {
                [Op.and]: [
                    {school_year_at: 11},
                    // {convocation_at: activeProcess.convocationId},
                    // {prosecution_at: activeProcess.prosecutionId},
                    {student_id: item.id},
                    {deleted_at: {[Op.is]: null}}
                ]
            },
            order: [
                ['id', 'DESC']
            ],
            include: [
                {
                    model: CareerApplicationSigies,
                    as: 'career_application',
                    required: true,
                    attributes: ['id', 'order_career'],
                    where: {
                        [Op.and]: [
                            {school_year_at: 11},
                            {deleted_at: {[Op.is]: null}}
                        ]
                    },
                    include: [
                        {
                            model: ModalitySigies,
                            as: 'modality',
                            required: true,
                            attributes: ['name']
                        },
                        {
                            model: CareerSigies,
                            as: 'career',
                            required: true,
                            attributes: ['name']
                        },
                    ]
                },
            ]
        });

        if (application) {
            itemStudent.applications = application;
        }

        //Obtener la información del expediente del estudiante (carrera asignada, notas)
        const expedientInfo = await ExpedientStudentSigies.findAll({
            attributes: ['id'],
            where: {
                [Op.and]: [
                    {school_year_at: 11},
                    {student_id: item.id},
                    {deleted_at: {[Op.is]: null}}
                ]
            },
            include: [
                {
                    model: CareerSigies,
                    as: 'career',
                    attributes: ['id', 'name'],
                    required: false,
                    where: {
                        [Op.and]: [
                            {school_year_at: 11},
                            {deleted_at: {[Op.is]: null}}
                        ]
                    }
                },
                {
                    model: CesSigies,
                    as: 'ces',
                    attributes: ['id', 'name'],
                    required: false,
                    where: {
                        [Op.and]: [
                            {school_year_at: 11},
                            {deleted_at: {[Op.is]: null}}
                        ]
                    }
                },
                {
                    model: ModalitySigies,
                    as: 'modality',
                    attributes: ['name'],
                    required: false,
                    where: {
                        [Op.and]: [
                            {school_year_at: 11},
                            {deleted_at: {[Op.is]: null}}
                        ]
                    }
                },
                {
                    model: MilitaryServiceSigies,
                    as: 'military',
                    attributes: ['name'],
                    required: false,
                    where: {
                        deleted_at: {[Op.is]: null}
                    }
                },
                {
                    model: NoteExpedientStudentSigies,
                    as: 'note_expedient',
                    attributes: ['note'],
                    required: false,
                    where: {
                        [Op.and]: [
                            {school_year_at: 11},
                            {deleted_at: {[Op.is]: null}}
                        ]
                    },
                    include: [
                        {
                            model: ExaminationSigies,
                            as: 'examination',
                            attributes: ['id', 'short_name'],
                            required: false,
                            where: {
                                [Op.and]: [
                                    {school_year_at: 11},
                                    {deleted_at: {[Op.is]: null}}
                                ]
                            }
                        },
                    ]
                },
            ]
        });

        if (expedientInfo) {
            itemStudent.expedient = expedientInfo;
        }

        if (itemStudent) {
            await data.push(itemStudent);
        }
    }

    standardResponse(responseTypes._200_SUCCESS, "", data, res);
};

const getALlInfoStudent = async (req, res) => {
    let data = [];
    const activeProcess = await ActiveProcess.findOne();
    const studentModels = await StudentSigies.findAll({
        attributes: ['id', 'name', 'lastname', 'ci', 'province_id', 'municipality_id', 'income_source_id', 'preuniversity_id', 'commission_at', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
        where: {
            [Op.and]: [
                {province_id: 31},
                {preuniversity_id: 42},
                {school_year_at: 11},
                //{ci: req.params.ci},
                {deleted_at: {[Op.is]: null}}
            ]
        },
        include:
        [
            {
                model: ApplicationSigies,
                as: 'application',
                required: false,
                attributes: ['id', 'prosecution_at', 'convocation_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: 11},
                        // {convocation_at: activeProcess.convocationId},
                        // {prosecution_at: activeProcess.prosecutionId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
                include: [
                    {
                        model: CareerApplicationSigies,
                        as: 'career_application',
                        required: false,
                        attributes: ['id', 'order_career'],
                        where: {
                            [Op.and]: [
                                {school_year_at: 11},
                                {deleted_at: {[Op.is]: null}}
                            ]
                        },
                        include: [
                            {
                                model: ModalitySigies,
                                as: 'modality',
                                required: false,
                                attributes: ['name']
                            },
                            {
                                model: CareerSigies,
                                as: 'career',
                                required: false,
                                attributes: ['name']
                            },
                        ]
                    },
                ]
            },
            {
                model: ExpedientStudentSigies,
                as: 'expedient',
                attributes: ['id'],
                where: {
                    [Op.and]: [
                        {school_year_at: 11},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
                include: [
                    {
                        model: CareerSigies,
                        as: 'career',
                        attributes: ['id', 'name'],
                        required: false,
                        where: {
                            [Op.and]: [
                                {school_year_at: 11},
                                {deleted_at: {[Op.is]: null}}
                            ]
                        }
                    },
                    {
                        model: CesSigies,
                        as: 'ces',
                        attributes: ['id', 'name'],
                        required: false,
                        where: {
                            [Op.and]: [
                                {school_year_at: 11},
                                {deleted_at: {[Op.is]: null}}
                            ]
                        }
                    },
                    {
                        model: ModalitySigies,
                        as: 'modality',
                        attributes: ['name'],
                        required: false,
                        where: {
                            [Op.and]: [
                                {school_year_at: 11},
                                {deleted_at: {[Op.is]: null}}
                            ]
                        }
                    },
                    {
                        model: MilitaryServiceSigies,
                        as: 'military',
                        attributes: ['name'],
                        required: false,
                        where: {
                            deleted_at: {[Op.is]: null}
                        }
                    },
                    {
                        model: NoteExpedientStudentSigies,
                        as: 'note_expedient',
                        attributes: ['note'],
                        required: false,
                        where: {
                            [Op.and]: [
                                {school_year_at: 11},
                                {deleted_at: {[Op.is]: null}}
                            ]
                        },
                        include: [
                            {
                                model: ExaminationSigies,
                                as: 'examination',
                                attributes: ['id', 'short_name'],
                                required: false,
                                where: {
                                    [Op.and]: [
                                        {school_year_at: 11},
                                        {deleted_at: {[Op.is]: null}}
                                    ]
                                }
                            },
                        ]
                    },
                ]
            }
        ],
        order: [
            [ {model: ApplicationSigies, as: 'application'}, 'id', 'DESC' ]
        ]
    });

    standardResponse(responseTypes._200_SUCCESS, "", studentModels, res);
};

module.exports = {
    getCareers,
    getNomStates,
    getSchoolYears,
    getConvocations,
    getCommissions,
    getProvinces,
    getIncomeSources,
    getEducationCenters,
    getPlacePlans,
    getGenders,
    getProsecutions,
    getPlacePlanCareerProsecutions,
    getModalities,
    getStudents,
    getMunicipalities,
    getPreuniversities,
    getApplications,
    getCareerApplications,
    getExpedientStudents,
    getMilitaryServices,
    getExaminations,
    getNoteExpedientStudents,
    getScienceAreas,
    getApplicationStudent,
    getALlInfoStudent
};
