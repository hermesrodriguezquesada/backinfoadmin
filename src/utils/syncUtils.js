const {responseTypes, standardResponse, cleanType, cleanTablesInfo} = require('../utils/globalUtils');
const {Op} = require("sequelize");
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
    Preuniversity,
    EducationCenterCareer
} = require('../database/models');

/**
 * Función para sincronizar la tabla ActiveProcess
 *
 * @param res
 * @param openProcessData
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToActiveProcess = async (res, openProcessData, response = false) => {
    const model = await ActiveProcess.findOne();
    if (!model) {
        const newModel = await ActiveProcess.create({
            schoolYearId: openProcessData.schoolYearOpenId,
            convocationId: openProcessData.convocationOpenId,
            prosecutionId: openProcessData.prosecutionOpenId
        });

        if (response) {
            standardResponse(responseTypes._200_SUCCESS, "", newModel, res);
        } else {
            return true;
        }
    } else {
        //Verificar que campos fueron actualizados
        const attrsUpdate = {};

        if (model.schoolYearId != openProcessData.schoolYearOpenId) {
            attrsUpdate.schoolYearId = openProcessData.schoolYearOpenId;
        }

        if (model.convocationId != openProcessData.convocationOpenId) {
            attrsUpdate.convocationId = openProcessData.convocationOpenId;
        }

        if (model.prosecutionId != openProcessData.prosecutionOpenId) {
            attrsUpdate.prosecutionId = openProcessData.prosecutionOpenId;
        }

        if (Object.entries(attrsUpdate).length != 0) {
            const newModel = await model.update(attrsUpdate);
            if (response) {
                standardResponse(responseTypes._200_SUCCESS, "", newModel, res);
            } else {
                return true;
            }
        } else {
            if (response) {
                standardResponse(responseTypes._200_SUCCESS, "La tabla ActiveProcess está actualizada", null, res);
            } else {
                return true;
            }
        }
    }

    return false;
};

/**
 * Función para sincronizar la tabla IncomeSource
 *
 * @param res
 * @param incomeSourceListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToIncomeSource = async (res, incomeSourceListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;
    const totalIncomeSources = await IncomeSource.count();
    const incomeSourcesDeleted = await cleanTablesInfo(cleanType.INCOME_SOURCES);
    totalDelete = totalDelete + incomeSourcesDeleted;

    for (const item of incomeSourceListSigies) {
        if (totalIncomeSources === 0) {
            const newModel = await IncomeSource.create({
                id: item.id,
                name: item.name,
                code: item.code,
                schoolYearId: item.school_year_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await IncomeSource.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await IncomeSource.create({
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        schoolYearId: item.school_year_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.code != item.code) {
                        attrsUpdate.code = item.code;
                    }

                    if (model.name != item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};

/**
 * Función para sincronizar la tabla ScienceArea
 *
 * @param res
 * @param scienceAreaListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToScienceArea = async (res, scienceAreaListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;
    const totalScienceAreas = await ScienceArea.count();
    const areasDeleted = await cleanTablesInfo(cleanType.SCIENCE_AREAS);
    totalDelete = totalDelete + areasDeleted;

    for (const item of scienceAreaListSigies) {
        if (totalScienceAreas === 0) {
            const newModel = await ScienceArea.create({
                id: item.id,
                name: item.name,
                code: item.code,
                schoolYearId: item.school_year_at,
                updatedAtSigies: item.updated_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await ScienceArea.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await ScienceArea.create({
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        schoolYearId: item.school_year_at,
                        updatedAtSigies: item.updated_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.code != item.code) {
                        attrsUpdate.code = item.code;
                    }

                    if (model.name != item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (model.updatedAtSigies !== item.updated_at) {
                        attrsUpdate.updatedAtSigies = item.updated_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};

/**
 * Función para sincronizar la tabla Career
 *
 * @param res
 * @param careerListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToCareer = async (res, careerListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;
    const totalCareers = await Career.count();
    const careersDeleted = await cleanTablesInfo(cleanType.CAREERS);
    totalDelete = totalDelete + careersDeleted;

    for (const item of careerListSigies) {
        if (totalCareers === 0) {
            const newModel = await Career.create({
                id: item.id,
                name: item.name,
                code: item.code,
                scienceAreaId: item.science_area_id,
                schoolYearId: item.school_year_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await Career.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await Career.create({
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        scienceAreaId: item.science_area_id,
                        schoolYearId: item.school_year_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.code != item.code) {
                        attrsUpdate.code = item.code;
                    }

                    if (model.name != item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.scienceAreaId != item.science_area_id) {
                        attrsUpdate.scienceAreaId = item.science_area_id;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};

/**
 * Función para sincronizar la tabla Province
 *
 * @param res
 * @param provinceListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToProvince = async (res, provinceListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;
    const totalProvinces = await Province.count();
    const provincesDeleted = await cleanTablesInfo(cleanType.PROVINCES);
    totalDelete = totalDelete + provincesDeleted;

    for (const item of provinceListSigies) {
        if (totalProvinces === 0) {
            const newModel = await Province.create({
                id: item.id,
                name: item.name,
                code: item.code,
                schoolYearId: item.school_year_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await Province.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await Province.create({
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        schoolYearId: item.school_year_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.code != item.code) {
                        attrsUpdate.code = item.code;
                    }

                    if (model.name != item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};

/**
 * Función para sincronizar la tabla Municipality
 *
 * @param res
 * @param municipalityListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToMunicipality = async (res, municipalityListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;
    const totalMunicipalitys = await Municipality.count();
    const municipalitysDeleted = await cleanTablesInfo(cleanType.MUNICIPALITY);
    totalDelete = totalDelete + municipalitysDeleted;

    for (const item of municipalityListSigies) {
        if (totalMunicipalitys === 0) {
            const newModel = await Municipality.create({
                id: item.id,
                name: item.name,
                shortName: item.short_name,
                code: item.code,
                provinceId: item.province_id,
                schoolYearId: item.school_year_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await Municipality.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await Municipality.create({
                        id: item.id,
                        name: item.name,
                        shortName: item.short_name,
                        code: item.code,
                        provinceId: item.province_id,
                        schoolYearId: item.school_year_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.name != item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.shortName != item.short_name) {
                        attrsUpdate.shortName = item.short_name;
                    }

                    if (model.code != item.code) {
                        attrsUpdate.code = item.code;
                    }

                    if (model.provinceId != item.province_id) {
                        attrsUpdate.provinceId = item.province_id;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};

/**
 * Función para sincronizar la tabla EducationCenter
 *
 * @param res
 * @param cesListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToEducationCenter = async (res, cesListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;
    const totalEducationCenters = await EducationCenter.count();
    const educationCentersDeleted = await cleanTablesInfo(cleanType.EDUCATION_CENTERS);
    totalDelete = totalDelete + educationCentersDeleted;

    for (const item of cesListSigies) {
        if (totalEducationCenters === 0) {
            const newModel = await EducationCenter.create({
                id: item.id,
                name: item.name,
                code: item.code,
                provinceId: item.province_id,
                schoolYearId: item.school_year_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await EducationCenter.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await EducationCenter.create({
                        id: item.id,
                        name: item.name,
                        code: item.code,
                        provinceId: item.province_id,
                        schoolYearId: item.school_year_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.code != item.code) {
                        attrsUpdate.code = item.code;
                    }

                    if (model.name != item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.provinceId != item.province_id) {
                        attrsUpdate.provinceId = item.province_id;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};

/**
 * Función para sincronizar la tabla PlacePlan
 *
 * @param res
 * @param placePlanListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToPlacePlan = async (res, placePlanListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;

    const totalPlacePlans = await PlacePlan.count();
    const placePlansDeleted = await cleanTablesInfo(cleanType.PLACE_PLANS);
    totalDelete = totalDelete + placePlansDeleted;

    for (const item of placePlanListSigies) {
        if (totalPlacePlans === 0) {
            const newModel = await PlacePlan.create({
                id: item.id,
                careerId: item.career,
                incomeSourceId: item.income_source_id,
                gender: item.gender.name,
                modality: item.modality.name,
                educationCenter: item.ces_id,
                prosecutionID: item.prosecution_at,
                convocationID: item.convocation_at,
                schoolYearId: item.school_year_at,
                initialCapacity: item.initial_capacity,
                provinceId: item.place_plan.province.id
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await PlacePlan.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await PlacePlan.create({
                        id: item.id,
                        careerId: item.career,
                        incomeSourceId: item.income_source_id,
                        gender: item.gender.name,
                        modality: item.modality.name,
                        educationCenter: item.ces_id,
                        prosecutionID: item.prosecution_at,
                        convocationID: item.convocation_at,
                        schoolYearId: item.school_year_at,
                        initialCapacity: item.initial_capacity,
                        provinceId: item.place_plan.province.id
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.careerId != item.career) {
                        attrsUpdate.careerId = item.career;
                    }

                    if (model.incomeSourceId != item.income_source_id) {
                        attrsUpdate.incomeSourceId = item.income_source_id;
                    }

                    if (model.gender != item.gender.name) {
                        attrsUpdate.gender = item.gender.name;
                    }

                    if (model.modality != item.modality.name) {
                        attrsUpdate.modality = item.modality.name;
                    }

                    if (model.educationCenter != item.ces_id) {
                        attrsUpdate.educationCenter = item.ces_id;
                    }

                    if (model.prosecutionID !== item.prosecution_at) {
                        attrsUpdate.prosecutionID = item.prosecution_at;
                    }

                    if (model.convocationID !== item.convocation_at) {
                        attrsUpdate.convocationID = item.convocation_at;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (model.initialCapacity != item.initial_capacity) {
                        attrsUpdate.initialCapacity = item.initial_capacity;
                    }

                    if (model.provinceId != item.place_plan.province.id) {
                        attrsUpdate.provinceId = item.place_plan.province.id;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};

/**
 * Función para sincronizar la tabla Student
 *
 * @param res
 * @param studentListSigies
 * @param response
 * @returns {Promise<{totalNoChange: *, totalDelete: *, totalNew: *, totalUpdate: *}>}
 */
const syncToStudent = async (res, studentListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;

    const totalStudents = await Student.count();
    const studentsDeleted = await cleanTablesInfo(cleanType.STUDENTS);
    totalDelete = totalDelete + studentsDeleted;

    for (const item of studentListSigies) {
        let assign = {
            id: (item["expedient"][0]["id"]) ? item["expedient"][0]["id"] : null,
            career: (item["expedient"][0]["career"]) ? item["expedient"][0]["career"]["name"] : null,
            ces: (item["expedient"][0]["ces"]) ? item["expedient"][0]["ces"]["name"] : null,
            modality: (item["expedient"][0]["modality"]) ? item["expedient"][0]["modality"]["name"] : null,
            military: (item["expedient"][0]["military"]) ? item["expedient"][0]["military"]["name"] : null
        };

        let notes = {
            academic_index: item.academic_index,
            note_expedient: item["expedient"][0]["note_expedient"]
        };

        if (totalStudents === 0) {
            const newModel = await Student.create({
                id: item.id,
                name: item.name,
                lastName: item.lastname,
                ci: item.ci,
                provinceId: item.province_id,
                municipalityId: item.municipality_id,
                incomeSourceId: item.income_source_id,
                preuniversityId: item.preuniversity_id,
                commissionId: item.commission_at,
                applications: item.application[0],
                notes: notes,
                assignations: assign,
                createdAt: item.created_at,
                updatedAtSigies: item.updated_at,
                schoolYearId: item.school_year_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await Student.findOne({where: {id: item.id}});

            if (!model) {

                if (!item.deleted_at) {
                    const newModel = await Student.create({
                        id: item.id,
                        name: item.name,
                        lastName: item.lastname,
                        ci: item.ci,
                        provinceId: item.province_id,
                        municipalityId: item.municipality_id,
                        incomeSourceId: item.income_source_id,
                        preuniversityId: item.preuniversity_id,
                        commissionId: item.commission_at,
                        applications: item.application[0],
                        notes: notes,
                        assignations: assign,
                        createdAt: item.created_at,
                        updatedAtSigies: item.updated_at,
                        schoolYearId: item.school_year_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.name !== item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.lastName !== item.lastName) {
                        attrsUpdate.lastName = item.lastName;
                    }

                    if (model.ci !== item.ci) {
                        attrsUpdate.ci = item.ci;
                    }

                    if (model.provinceId !== item.province_id) {
                        attrsUpdate.provinceId = item.province_id;
                    }

                    if (model.municipalityId !== item.municipality_id) {
                        attrsUpdate.municipalityId = item.municipality_id;
                    }

                    if (model.incomeSourceId !== item.income_source_id) {
                        attrsUpdate.incomeSourceId = item.income_source_id;
                    }

                    if (model.preuniversityId !== item.preuniversity_id) {
                        attrsUpdate.preuniversityId = item.preuniversity_id;
                    }

                    if (model.commissionId !== item.commission_at) {
                        attrsUpdate.commissionId = item.commission_at;
                    }

                    if (model.applications !== item.application[0]) {
                        attrsUpdate.applications = item.application[0];
                    }

                    if (model.notes !== notes) {
                        attrsUpdate.notes = notes;
                    }

                    if (model.assignations !== assign) {
                        attrsUpdate.assignations = assign;
                    }

                    if (model.updatedAt !== item.updated_at) {
                        attrsUpdate.updatedAt = item.updated_at;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return data;
    }
};

/**
 * Función para sincronizar la tabla Commission
 *
 * @param res
 * @param commissionListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToCommission = async (res, commissionListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;
    const totalCommissions = await Commission.count();
    const commissionsDeleted = await cleanTablesInfo(cleanType.COMMISSION);
    totalDelete = totalDelete + commissionsDeleted;

    for (const item of commissionListSigies) {
        if (totalCommissions === 0) {
            const newModel = await Commission.create({
                id: item.id,
                name: item.name,
                provinceId: item.province_id,
                schoolYearId: item.school_year_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await Commission.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await Commission.create({
                        id: item.id,
                        name: item.name,
                        provinceId: item.province_id,
                        schoolYearId: item.school_year_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.name != item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.provinceId != item.province_id) {
                        attrsUpdate.provinceId = item.province_id;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};

/**
 * Función para sincronizar la tabla Preuniversity
 *
 * @param res
 * @param preuniversityListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToPreuniversity = async (res, preuniversityListSigies, response = false) => {

    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;
    const totalPreuniversitys = await Preuniversity.count();
    const preuniversitysDeleted = await cleanTablesInfo(cleanType.PREUNIVERSITY);
    totalDelete = totalDelete + preuniversitysDeleted;

    for (const item of preuniversityListSigies) {
        if (totalPreuniversitys === 0) {
            const newModel = await Preuniversity.create({
                id: item.id,
                name: item.name,
                municipalityId: item.municipality_id,
                code: item.code,
                schoolYearId: item.school_year_at
            });

            if (newModel) {
                totalNew = totalNew + 1;
            }
        } else {
            const model = await Preuniversity.findOne({where: {id: item.id}});

            if (!model) {
                if (!item.deleted_at) {
                    const newModel = await Preuniversity.create({
                        id: item.id,
                        name: item.name,
                        municipalityId: item.municipality_id,
                        code: item.code,
                        schoolYearId: item.school_year_at
                    });

                    if (newModel) {
                        totalNew = totalNew + 1;
                    }
                }
            } else {
                if (item.deleted_at) {
                    await model.destroy();
                    totalDelete = totalDelete + 1;
                } else {
                    //Verificar que campos fueron actualizados
                    const attrsUpdate = {};

                    if (model.name != item.name) {
                        attrsUpdate.name = item.name;
                    }

                    if (model.code != item.code) {
                        attrsUpdate.code = item.code;
                    }

                    if (model.municipalityId != item.municipality_id) {
                        attrsUpdate.municipalityId = item.municipality_id;
                    }

                    if (model.schoolYearId !== item.school_year_at) {
                        attrsUpdate.schoolYearId = item.school_year_at;
                    }

                    if (Object.entries(attrsUpdate).length != 0) {
                        const newModel = await model.update(attrsUpdate);
                        if (newModel) {
                            totalUpdate = totalUpdate + 1;
                        }
                    } else {
                        totalNoChange = totalNoChange + 1;
                    }
                }
            }
        }
    }
    ;

    const data = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }
};

/**
 * Función para sincronizar la tabla EducationCenterCareer, corresponde a las vinculaciones territoriales de carreras de un ces
 *
 * @param res
 * @param territorialLinkListSigies
 * @param response
 * @returns {Promise<boolean>}
 */
const syncToEducationCenterCareer = async (res, territorialLinkListSigies, response = false) => {

    const educationCenters = await EducationCenter.findAll();

    for (let ces of educationCenters) {

        const careerByCes = await territorialLinkListSigies.filter(item => item.ces_id == ces.id);
        const careerByCesMap = await careerByCes.map(obj => {
            return parseInt(obj.career_id);
        });

        const careers = await Career.findAll({
            where: {
                id: {
                    [Op.in]: careerByCesMap,
                }
            }
        });

        ces.setCareers(careers);
    }

    const data = {
        totalItems: territorialLinkListSigies.length
    };

    if (response) {
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    } else {
        return true;
    }

};


module.exports = {
    syncToActiveProcess,
    syncToScienceArea,
    syncToCareer,
    syncToProvince,
    syncToEducationCenter,
    syncToIncomeSource,
    syncToPlacePlan,
    syncToStudent,
    syncToCommission,
    syncToMunicipality,
    syncToPreuniversity,
    syncToEducationCenterCareer
};

