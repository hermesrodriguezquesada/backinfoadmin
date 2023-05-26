const {Op, col, fn, QueryTypes} = require("sequelize");
const {sequelizeSigies} = require("../database");
const moment = require('moment');
const {
    ActiveProcess,
    ScienceArea,
    Career,
    Province,
    EducationCenter,
    IncomeSource,
    PlacePlan,
    Student,
    Commission,
    Municipality,
    Preuniversity
} = require('../database/models');
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
    ScienceAreaSigies,
    GenderPlacePlanSigies,
    TerritorialLinkSigies
} = require('../database/sigies-models');

/**
 * Arreglo de constantes que aplican en el SIGIES y son útiles en las consultas
 *
 */
const sigiesConstantVar = {
    OPEN_STATE_TYPE: 'open',
    CLOSE_STATE_TYPE: 'close'
};

/**
 * Función para obtener desde el SIGIES los procesos que estén en estado abierto
 *
 * @returns {Promise<{schoolYearOpenId: *, convocationOpenId: *, prosecutionOpenId: *, stateOpenId: *}>}
 */
const getOpenProcessSigies = async () => {
    const result = await NomStateSigies.findOne({
        attributes: ['id'],
        where: {
            [Op.and]: [
                {type: sigiesConstantVar.OPEN_STATE_TYPE},
                {deleted_at: {[Op.is]: null}}
            ]
        },
        include: [
            {
                model: SchoolYearSigies,
                required: true,
                attributes: ['id'],
            },
            {
                model: ConvocationSigies,
                required: true,
                attributes: ['id']
            },
            {
                model: ProsecutionSigies,
                required: true,
                attributes: ['id']
            },
        ]
    });

    const data = {
        stateOpenId: result.id,
        schoolYearOpenId: result.SchoolYearSigies[0].id,
        convocationOpenId: result.ConvocationSigies[0].id,
        prosecutionOpenId: result.ProsecutionSigies[0].id
    };

    return data;
};

/**
 * Función para obtener las áreas de las ciencias del SIGIES
 *
 * @param boolean onlyUpdate
 * @returns {Promise<Model[]|boolean>}
 */
const getScienceAreasSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await ScienceAreaSigies.findAll({
                attributes: ['id', 'code', 'name', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
            });
            return data;
        } else {

            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await ScienceArea.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }

            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await ScienceAreaSigies.findAll({
                attributes: ['id', 'code', 'name', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ],
                        }

                    ]
                },
            });
            return data;
        }
    }
};

/**
 * Función para obtener las carreras del SIGIES
 *
 * @param boolean onlyUpdate
 * @returns {Promise<Model[]|boolean>}
 */
const getCareersSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await CareerSigies.findAll({
                attributes: ['id', 'code', 'name', 'science_area_id', 'created_at', 'updated_at', 'deleted_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
            });
            return data;
        } else {
            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await Career.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }
            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await CareerSigies.findAll({
                attributes: ['id', 'code', 'name', 'science_area_id', 'created_at', 'updated_at', 'deleted_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ],
                        }

                    ]
                },
            });
            return data;
        }
    }
};

/**
 * Función para obtener las provincias del SIGIES
 *
 * @param boolean onlyUpdate
 * @returns {Promise<Model[]|boolean>}
 */
const getProvincesSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await ProvinceSigies.findAll({
                attributes: ['id', 'code', 'name', 'created_at', 'updated_at', 'deleted_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
            });
            return data;
        } else {
            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await Province.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }
            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await ProvinceSigies.findAll({
                attributes: ['id', 'code', 'name', 'created_at', 'updated_at', 'deleted_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ],
                        }

                    ]
                },
            });
            return data;
        }
    }
};

/**
 * Función para obtener las centros de educación superior(CES) del SIGIES
 *
 * @param boolean onlyUpdate
 * @returns {Promise<Model[]|boolean>}
 */
const getEducationCentersSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await CesSigies.findAll({
                attributes: ['id', 'code', 'name', 'province_id', 'created_at', 'updated_at', 'deleted_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
            });
            return data;
        } else {
            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await EducationCenter.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }

            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await CesSigies.findAll({
                attributes: ['id', 'code', 'name', 'province_id', 'created_at', 'updated_at', 'deleted_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ],
                        }

                    ]
                },
            });
            return data;
        }
    }
};

/**
 * Función para obtener las vías de ingreso del SIGIES
 *
 * @param boolean onlyUpdate
 * @returns {Promise<Model[]|boolean>}
 */
const getIncomeSourcesSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await IncomeSourceSigies.findAll({
                attributes: ['id', 'code', 'name', 'created_at', 'updated_at', 'deleted_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
            });
            return data;
        } else {
            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await IncomeSource.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }
            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await IncomeSourceSigies.findAll({
                attributes: ['id', 'code', 'name', 'created_at', 'updated_at', 'deleted_at', 'school_year_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ],
                        }

                    ]
                },
            });
            return data;
        }
    }
};

/**
 * Función para obtener el plan de plazas activo de una provincia del SIGIES
 *
 * @param onlyUpdate:boolean
 * @param provinceId:integer
 * @returns {Promise<Model[]|boolean>}
 */
const getPlacePlanCareerProsecutionsByProvinceSigies = async (onlyUpdate, provinceId) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await PlacePlanCareerProsecutionSigies.findAll({
                attributes: ['id', 'career', 'income_source_id', 'ces_id', 'initial_capacity', 'prosecution_at', 'convocation_at', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {convocation_at: activeProcess.convocationId},
                        {prosecution_at: activeProcess.prosecutionId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
                include: [
                    {
                        model: GenderPlacePlanSigies,
                        as: 'gender',
                        required: true,
                        attributes: ['name'],
                    },
                    {
                        model: ModalitySigies,
                        as: 'modality',
                        required: true,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: PlacePlanSigies,
                        as: 'place_plan',
                        required: true,
                        attributes: ['id'],
                        include: [
                            {
                                model: ProvinceSigies,
                                as: 'province',
                                required: true,
                                attributes: ['id'],
                                where: {'id': provinceId}
                            },
                        ]
                    },
                ]
            });
            return data;
        } else {
            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await PlacePlan.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }

            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await PlacePlanCareerProsecutionSigies.findAll({
                attributes: ['id', 'career', 'income_source_id', 'ces_id', 'initial_capacity', 'prosecution_at', 'convocation_at', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {convocation_at: activeProcess.convocationId},
                        {prosecution_at: activeProcess.prosecutionId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ]
                        }

                    ]
                },
                include: [
                    {
                        model: GenderPlacePlanSigies,
                        as: 'gender',
                        required: true,
                        attributes: ['name'],
                    },
                    {
                        model: ModalitySigies,
                        as: 'modality',
                        required: true,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: PlacePlanSigies,
                        as: 'place_plan',
                        required: true,
                        attributes: ['id'],
                        include: [
                            {
                                model: ProvinceSigies,
                                as: 'province',
                                required: true,
                                attributes: ['id'],
                                where: {'id': provinceId}
                            },
                        ]
                    },
                ]
            });
            return data;
        }
    }
};

/**
 * Función para obtener el plan de plazas activo del SIGIES
 *
 * @param onlyUpdate:boolean
 * @returns {Promise<Model[]|boolean>}
 */
const getPlacePlanCareerProsecutionsSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await PlacePlanCareerProsecutionSigies.findAll({
                attributes: ['id', 'career', 'income_source_id', 'ces_id', 'initial_capacity', 'prosecution_at', 'convocation_at', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {convocation_at: activeProcess.convocationId},
                        {prosecution_at: activeProcess.prosecutionId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
                include: [
                    {
                        model: GenderPlacePlanSigies,
                        as: 'gender',
                        required: true,
                        attributes: ['name'],
                    },
                    {
                        model: ModalitySigies,
                        as: 'modality',
                        required: true,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: PlacePlanSigies,
                        as: 'place_plan',
                        required: true,
                        attributes: ['id'],
                        include: [
                            {
                                model: ProvinceSigies,
                                as: 'province',
                                required: true,
                                attributes: ['id']
                            },
                        ]
                    },
                ]
            });
            return data;
        } else {
            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await PlacePlan.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }

            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await PlacePlanCareerProsecutionSigies.findAll({
                attributes: ['id', 'career', 'income_source_id', 'ces_id', 'initial_capacity', 'prosecution_at', 'convocation_at', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {convocation_at: activeProcess.convocationId},
                        {prosecution_at: activeProcess.prosecutionId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ]
                        }

                    ]
                },
                include: [
                    {
                        model: GenderPlacePlanSigies,
                        as: 'gender',
                        required: true,
                        attributes: ['name'],
                    },
                    {
                        model: ModalitySigies,
                        as: 'modality',
                        required: true,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: PlacePlanSigies,
                        as: 'place_plan',
                        required: true,
                        attributes: ['id'],
                        include: [
                            {
                                model: ProvinceSigies,
                                as: 'province',
                                required: true,
                                attributes: ['id']
                            },
                        ]
                    },
                ]
            });
            return data;
        }
    }
};

/**
 * Función para obtener los estudiantes del SIGIES
 *
 * @param onlyUpdate:boolean
 * @returns {Promise<Model[]|boolean>}
 */
const getStudentsSigies = async (onlyUpdate, provinceId) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await StudentSigies.findAll({
                attributes: ['id', 'name', 'lastname', 'ci', 'province_id', 'municipality_id', 'income_source_id', 'preuniversity_id', 'commission_at', 'school_year_at', 'created_at', 'updated_at', 'deleted_at', 'academic_index'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {province_id: provinceId},
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
                                    {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
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
                                    {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
                                            {deleted_at: {[Op.is]: null}}
                                        ]
                                    },
                                    include: [
                                        {
                                            model: ExaminationSigies,
                                            as: 'examination',
                                            attributes: ['id', 'short_name', 'name'],
                                            required: false,
                                            where: {
                                                [Op.and]: [
                                                    {school_year_at: activeProcess.schoolYearId},
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
            return data;
        }
        else {
            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await Student.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }

            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await StudentSigies.findAll({
                attributes: ['id', 'name', 'lastname', 'ci', 'province_id', 'municipality_id', 'income_source_id', 'preuniversity_id', 'commission_at', 'school_year_at', 'created_at', 'updated_at', 'deleted_at', 'academic_index'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {province_id: provinceId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ]
                        }

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
                                    {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
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
                                    {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
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
                                            {school_year_at: activeProcess.schoolYearId},
                                            {deleted_at: {[Op.is]: null}}
                                        ]
                                    },
                                    include: [
                                        {
                                            model: ExaminationSigies,
                                            as: 'examination',
                                            attributes: ['id', 'short_name', 'name'],
                                            required: false,
                                            where: {
                                                [Op.and]: [
                                                    {school_year_at: activeProcess.schoolYearId},
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
            return data;
        }
    }
};

/**
 * Función para obtener las comisiones del SIGIES
 *
 * @param boolean onlyUpdate
 * @returns {Promise<Model[]|boolean>}
 */
const getCommissionsSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await CommissionSigies.findAll({
                attributes: ['id', 'name', 'province_id', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {deleted_at: {[Op.is]: null}},
                        {province_id: {[Op.not]: null}}
                    ]
                },
            });
            return data;
        } else {

            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await Commission.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }

            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await CommissionSigies.findAll({
                attributes: ['id', 'name', 'province_id', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ],
                        },
                        {province_id: {[Op.not]: null}}
                    ]
                },
            });
            return data;
        }
    }
};

/**
 * Función para obtener los municipios del SIGIES
 *
 * @param boolean onlyUpdate
 * @returns {Promise<Model[]|boolean>}
 */
const getMunicipalitiesSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await MunicipalitySigies.findAll({
                attributes: ['id', 'name', 'code', 'short_name', 'province_id', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
            });
            return data;
        } else {

            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await Municipality.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }

            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await MunicipalitySigies.findAll({
                attributes: ['id', 'name', 'code', 'short_name', 'province_id', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ],
                        }

                    ]
                },
            });
            return data;
        }
    }
};

/**
 * Función para obtener los preuniversitarios del SIGIES
 *
 * @param boolean onlyUpdate
 * @returns {Promise<Model[]|boolean>}
 */
const getPreuniversitiesSigies = async (onlyUpdate) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        if (!onlyUpdate) {
            const data = await PreuniversitySigies.findAll({
                attributes: ['id', 'name', 'code', 'municipality_id', 'province_id', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {deleted_at: {[Op.is]: null}}
                    ]
                },
            });
            return data;
        } else {

            let lastSyncDate = await moment().format('YYYY-MM-DD hh:mm:ss');
            const maxUpdated = await Preuniversity.max('updatedAtSigies');

            if(maxUpdated)
            {
                lastSyncDate = await moment(maxUpdated).format('YYYY-MM-DD hh:mm:ss');
            }

            //Traer todos los elementos que: (created_at||updated_at||deleted_at) > lastSyncDate
            const data = await PreuniversitySigies.findAll({
                attributes: ['id', 'name', 'code', 'municipality_id', 'province_id', 'school_year_at', 'created_at', 'updated_at', 'deleted_at'],
                where: {
                    [Op.and]: [
                        {school_year_at: activeProcess.schoolYearId},
                        {
                            [Op.or]: [
                                {created_at: {[Op.gt]: lastSyncDate}},
                                {updated_at: {[Op.gt]: lastSyncDate}},
                                {deleted_at: {[Op.gt]: lastSyncDate}},
                            ],
                        }

                    ]
                },
            });
            return data;
        }
    }
};

/**
 * Función para obtener las vinculaciones territoriales de carreras por ces del SIGIES
 *
 * @returns {Promise<Model[]|boolean>}
 */
const getTerritorialLinksSigies = async () => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {

        const data = await sequelizeSigies.query(`
            SELECT DISTINCT(nom_career.id) AS career_id, tb_ces.id AS ces_id
            FROM pkt_organization.tb_territorial_link
            INNER JOIN pkt_encoders.nom_career ON (
            tb_territorial_link.career_id = nom_career.id
            AND tb_territorial_link.school_year_at = ${activeProcess.schoolYearId}
            AND tb_territorial_link.deleted_at IS NULL
            )
            INNER JOIN pkt_organization.tb_ces ON tb_territorial_link.ces_id = tb_ces.id
            ORDER BY nom_career.id, tb_ces.id
            `,
            {type: QueryTypes.SELECT}
        );

        return data;
    }
};

/**
 * Función para obtener las notas de los examenes de un estudiante del SIGIES
 *
 * @returns {Promise<Model[]|boolean>}
 */
const getNotesByStudentCiSigies = async (ci) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {

        const data = await sequelizeSigies.query(`
            SELECT 
                r_examination_report_application.note
                , r_examination_report_application.reclamation1_note
                , r_examination_report_application.reclamation2_note
                , nom_examination.code AS exam_code
                , nom_examination.name AS exam_name
            FROM pkt_test.r_examination_report_application
            INNER JOIN pkt_test.tb_examination_report ON (
                r_examination_report_application.examination_report_id = tb_examination_report.id
                AND r_examination_report_application.deleted_at IS NULL
                AND tb_examination_report.deleted_at IS NULL
                AND r_examination_report_application.school_year_at = ${activeProcess.schoolYearId}
                AND tb_examination_report.school_year_at = ${activeProcess.schoolYearId}
            )
            INNER JOIN pkt_encoders.nom_examination ON (
                tb_examination_report.examination_id = nom_examination.id
                AND nom_examination.deleted_at IS NULL
                AND nom_examination.school_year_at = ${activeProcess.schoolYearId}
            )
            INNER JOIN pkt_organization.tb_application ON (
                r_examination_report_application.application_id = tb_application.id
                AND tb_application.deleted_at IS NULL
                AND tb_application.school_year_at = ${activeProcess.schoolYearId}
            )
            INNER JOIN pkt_organization.tb_student ON (
                tb_application.student_id = tb_student.id
                AND tb_student.ci = '${ci}'
                AND tb_student.deleted_at IS NULL
                AND tb_student.school_year_at = ${activeProcess.schoolYearId}
            )
            ORDER BY nom_examination.code
            `,
            {type: QueryTypes.SELECT}
        );

        return data;
    }
};

/**
 * Función para obtener los cortes de una carrera del SIGIES
 *
 * @returns {Promise<Model[]|boolean>}
 */
const getCutsCareer = async (careerCode, provinceCode) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {

        const data = await sequelizeSigies.query(`
                SELECT
                    r_places_plan_career_prosecution."cut_average",
                    nom_convocation."name" AS nom_convocation_name,
                    tb_school_year."name" AS tb_school_year_name,
                    tb_prosecution."name" AS tb_prosecution_name
                FROM "pkt_organization"."tb_province" tb_province
                INNER JOIN "pkt_organization"."tb_places_plan" tb_places_plan ON (
                    tb_province."id" = tb_places_plan."province_id"
                    AND tb_province.deleted_at IS NULL
                    AND tb_places_plan.deleted_at IS NULL
                    AND tb_province.code = '${provinceCode}'
                )            
                INNER JOIN "pkt_organization"."r_places_plan_career_prosecution" r_places_plan_career_prosecution ON (
                    tb_places_plan."id" = r_places_plan_career_prosecution."places_plan_id"
                    AND r_places_plan_career_prosecution.deleted_at IS NULL
                    AND r_places_plan_career_prosecution.cut_average IS NOT NULL
                )
                INNER JOIN "pkt_arq_base"."tb_school_year" tb_school_year ON (
                    r_places_plan_career_prosecution."school_year_at" = tb_school_year."id"
                    AND tb_school_year.deleted_at IS NULL
                )
                INNER JOIN "pkt_encoders"."nom_career" nom_career ON (
                    r_places_plan_career_prosecution."career" = nom_career."id"
                    AND nom_career.deleted_at IS NULL
                    AND nom_career.code = '${careerCode}'
                )
                INNER JOIN "pkt_encoders"."nom_convocation" nom_convocation ON (
                    r_places_plan_career_prosecution."convocation_at" = nom_convocation."id"
                    AND nom_convocation.deleted_at IS NULL
                )
                INNER JOIN pkt_assignment.tb_prosecution ON (
                    r_places_plan_career_prosecution."prosecution_at" = tb_prosecution."id"
                    AND tb_prosecution.deleted_at IS NULL
                )
                ORDER BY (tb_school_year.id, nom_career.code, tb_province.code, nom_convocation.name, tb_prosecution."id")
            `,
            {type: QueryTypes.SELECT}
        );

        return data;
    }
};

/**
 * Función para obtener los promedio de cortes de una carrera anual del SIGIES
 *
 * @returns {Promise<Model[]|boolean>}
 */
const getCutsAverageCareer = async (careerCode, provinceCode) => {
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {

        const data = await sequelizeSigies.query(`
                SELECT
                     avg(r_places_plan_career_prosecution."cut_average"::numeric) AS cut_average,
                     tb_school_year."name" AS tb_school_year_name
                FROM "pkt_organization"."tb_province" tb_province
                INNER JOIN "pkt_organization"."tb_places_plan" tb_places_plan ON (
                    tb_province."id" = tb_places_plan."province_id"
                    AND tb_province.deleted_at IS NULL
                    AND tb_places_plan.deleted_at IS NULL
                    AND tb_province.code = '${provinceCode}'
                )
                INNER JOIN "pkt_organization"."r_places_plan_career_prosecution" r_places_plan_career_prosecution ON (
                    tb_places_plan."id" = r_places_plan_career_prosecution."places_plan_id"
                    AND r_places_plan_career_prosecution.deleted_at IS NULL
                    AND r_places_plan_career_prosecution.cut_average IS NOT NULL
                )
                INNER JOIN "pkt_arq_base"."tb_school_year" tb_school_year ON (
                    r_places_plan_career_prosecution."school_year_at" = tb_school_year."id"
                    AND tb_school_year.deleted_at IS NULL
                )
                INNER JOIN "pkt_encoders"."nom_career" nom_career ON (
                    r_places_plan_career_prosecution."career" = nom_career."id"
                    AND nom_career.deleted_at IS NULL
                    AND nom_career.code = '${careerCode}'
                )
                GROUP BY tb_school_year.id
                ORDER BY tb_school_year.id DESC
            `,
            {type: QueryTypes.SELECT}
        );

        return data;
    }
};


module.exports = {
    sigiesConstantVar,
    getOpenProcessSigies,
    getScienceAreasSigies,
    getCareersSigies,
    getProvincesSigies,
    getEducationCentersSigies,
    getIncomeSourcesSigies,
    getPlacePlanCareerProsecutionsSigies,
    getPlacePlanCareerProsecutionsByProvinceSigies,
    getStudentsSigies,
    getCommissionsSigies,
    getMunicipalitiesSigies,
    getPreuniversitiesSigies,
    getTerritorialLinksSigies,
    getNotesByStudentCiSigies,
    getCutsCareer,
    getCutsAverageCareer
};

