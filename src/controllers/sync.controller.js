const {responseTypes, standardResponse, statusSync, modelTypeSync, getStatusSyncLabelById, getTypeSyncLabelById} = require('../utils/globalUtils');
const {Op} = require("sequelize");
const moment = require("moment");
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {paginate} = require('../libs/paginate');

const {
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
    getTerritorialLinksSigies
} = require('../utils/sigiesUtils');
const {
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
} = require('../utils/syncUtils');
const {
    ScienceArea,
    Career,
    Province,
    EducationCenter,
    IncomeSource,
    PlacePlan,
    Student,
    Syncronization,
    Commission,
    Municipality,
    Preuniversity,
    User
} = require('../database/models');

const sync = async () => {
    console.log('Syncing with SIGIES')
};

const syncComplete = async (req, res) => {
    console.log('Starting Sync with SIGIES');

    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.ALL,
        status: statusSync.PROCESS
    });

    let result = {};

    //1. Sync ActiveProcess
    console.log('   ****** => Starting Sync with OpenProcessTable');

    const openProcessData = await getOpenProcessSigies();
    result['OpenProcess'] = await syncToActiveProcess(res, openProcessData);

    console.log('   ****** => Finished Sync with OpenProcessTable');

    //2. Sync ScienceArea
    console.log('   ****** => Starting Sync with ScienceAreaTable');

    let resultScienceArea = true;
    const countScienceArea = await ScienceArea.count();
    const onlyUpdateScienceArea = await (countScienceArea > 0);

    //Obtención de los datos necesarios del sigies
    const dataScienceArea = await getScienceAreasSigies(onlyUpdateScienceArea);

    //ejecución del proceso de sincronización
    const responseScienceArea = await syncToScienceArea(res, dataScienceArea);

    if (!responseScienceArea) {
        resultScienceArea = false;
    }

    result['ScienceArea'] = resultScienceArea;

    console.log('   ****** => Finished Sync with ScienceAreaTable');

    //3. Sync Career
    console.log('   ****** => Starting Sync with CareerTable');

    let resultCareer = true;
    const countCareer = await Career.count();
    const onlyUpdateCareer = await (countCareer > 0);

    //Obtención de los datos necesarios del sigies
    const dataCareer = await getCareersSigies(onlyUpdateCareer);

    //ejecución del proceso de sincronización
    const responseCareer = await syncToCareer(res, dataCareer);

    if (!responseCareer) {
        resultCareer = false;
    }

    result['Career'] = resultCareer;

    console.log('   ****** => Finished Sync with CareerTable');

    //4. Sync Province
    console.log('   ****** => Starting Sync with ProvinceTable');

    let resultProvince = true;
    const countProvince = await Province.count();
    const onlyUpdateProvince = await (countProvince > 0);

    //Obtención de los datos necesarios del sigies
    const dataProvince = await getProvincesSigies(onlyUpdateProvince);

    //ejecución del proceso de sincronización
    const responseProvince = await syncToProvince(res, dataProvince);

    if (!responseProvince) {
        resultProvince = false;
    }

    result['Province'] = resultProvince;

    console.log('   ****** => Finished Sync with ProvinceTable');

    //4.2. Sync Commission
    console.log('   ****** => Starting Sync with CommissionTable');

    let resultCommission = true;
    const countCommission = await Commission.count();
    const onlyUpdateCommission = await (countCommission > 0);

    //Obtención de los datos necesarios del sigies
    const dataCommission = await getCommissionsSigies(onlyUpdateCommission);

    //ejecución del proceso de sincronización
    const responseCommission = await syncToCommission(res, dataCommission);

    if (!responseCommission) {
        resultCommission = false;
    }

    result['Commission'] = resultCommission;

    console.log('   ****** => Finished Sync with CommissionTable');

    //4.3. Sync Municipality
    console.log('   ****** => Starting Sync with MunicipalityTable');

    let resultMunicipality = true;
    const countMunicipality = await Municipality.count();
    const onlyUpdateMunicipality = await (countMunicipality > 0);

    //Obtención de los datos necesarios del sigies
    const dataMunicipality = await getMunicipalitiesSigies(onlyUpdateMunicipality);

    //ejecución del proceso de sincronización
    const responseMunicipality = await syncToMunicipality(res, dataMunicipality);

    if (!responseMunicipality) {
        resultMunicipality = false;
    }

    result['Municipality'] = resultMunicipality;

    console.log('   ****** => Finished Sync with MunicipalityTable');

    //4.3. Sync Preuniversity
    console.log('   ****** => Starting Sync with PreuniversityTable');

    let resultPreuniversity = true;
    const countPreuniversity = await Preuniversity.count();
    const onlyUpdatePreuniversity = await (countPreuniversity > 0);

    //Obtención de los datos necesarios del sigies
    const dataPreuniversity = await getPreuniversitiesSigies(onlyUpdatePreuniversity);

    //ejecución del proceso de sincronización
    const responsePreuniversity = await syncToPreuniversity(res, dataPreuniversity);

    if (!responsePreuniversity) {
        resultPreuniversity = false;
    }

    result['Preuniversity'] = resultPreuniversity;

    console.log('   ****** => Finished Sync with PreuniversityTable');

    //5. Sync EducationCenter
    console.log('   ****** => Starting Sync with EducationCenterTable');

    let resultEducationCenter = true;
    const countEducationCenter = await EducationCenter.count();
    const onlyUpdateEducationCenter = await (countEducationCenter > 0);

    //Obtención de los datos necesarios del sigies
    const dataEducationCenter = await getEducationCentersSigies(onlyUpdateEducationCenter);

    //ejecución del proceso de sincronización
    const responseEducationCenter = await syncToEducationCenter(res, dataEducationCenter);

    if (!responseEducationCenter) {
        resultEducationCenter = false;
    }

    result['EducationCenter'] = resultEducationCenter;

    console.log('   ****** => Finished Sync with EducationCenterTable');

    //5.2. Sync EducationCenterCareer
    console.log('   ****** => Starting Sync with EducationCenterCareerTable');

    let resultEducationCenterCareer = true;

    //Obtención de los datos necesarios del sigies
    const dataEducationCenterCareer = await getTerritorialLinksSigies();

    //ejecución del proceso de sincronización
    const responseEducationCenterCareer = await syncToEducationCenterCareer(res, dataEducationCenterCareer);

    if (!responseEducationCenterCareer) {
        resultEducationCenterCareer = false;
    }

    result['EducationCenterCareer'] = resultEducationCenterCareer;

    console.log('   ****** => Finished Sync with EducationCenterCareerTable');

    //6. Sync IncomeSource
    console.log('   ****** => Starting Sync with IncomeSourceTable');
    let resultIncomeSource = true;
    const countIncomeSource = await IncomeSource.count();
    const onlyUpdateIncomeSource = await (countIncomeSource > 0);

    //Obtención de los datos necesarios del sigies
    const dataIncomeSource = await getIncomeSourcesSigies(onlyUpdateIncomeSource);

    //ejecución del proceso de sincronización
    const responseIncomeSource = await syncToIncomeSource(res, dataIncomeSource);

    if (!responseIncomeSource) {
        resultIncomeSource = false;
    }

    result['IncomeSource'] = resultIncomeSource;

    console.log('   ****** => Finished Sync with IncomeSourceTable');

    //7. Sync PlacePlan
    console.log('   ****** => Starting Sync with PlacePlanTable');

    let resultPlacePlan = true;
    //obtener las provincias para ejecutar la sincronización por cada una para evitar un bloque de carga intenso
    const provinces = await Province.findAll({attributes: ['id']});
    if (provinces) {
        for (const item of provinces) {
            const countPlacePlan = await PlacePlan.count({where: {'provinceId': item.id}});
            const onlyUpdatePlacePlan = await (countPlacePlan > 0);

            //Obtención de los datos necesarios del sigies
            const dataPlacePlan = await getPlacePlanCareerProsecutionsByProvinceSigies(onlyUpdatePlacePlan, item.id);

            const totalPlacePlanProvince = dataPlacePlan.length;
            let startPlacePlan = 0; //Índice donde empieza la extracción. El primer elemento corresponde con el índice  0.
            let endPlacePlan = 500; //Índice  que marca el final de la extracción. slice extrae hasta, pero sin incluir el final.
            let stepPlacePlan = 500; //paso o total de elementos a procesar por grupos
            while (startPlacePlan < totalPlacePlanProvince) {

                if (endPlacePlan > totalPlacePlanProvince) {
                    endPlacePlan = totalPlacePlanProvince;
                }

                //dividir en grupos de elementos el arreglo principal para procesarlo
                let processDataPlacePlan = await dataPlacePlan.slice(startPlacePlan, endPlacePlan);

                //ejecución del proceso de sincronización
                const responsePlacePlan = await syncToPlacePlan(res, processDataPlacePlan);

                if (!responsePlacePlan) {
                    resultPlacePlan = false;
                }

                startPlacePlan += stepPlacePlan;
                endPlacePlan += stepPlacePlan;
            }
        }
    }

    result['PlacePlan'] = resultPlacePlan;

    console.log('   ****** => Finished Sync with PlacePlanTable');

    //8. Sync Student
    console.log('   ****** => Starting Sync with StudentTable');

    let resultStudent = true;
    const countStudent = await Student.count();
    const onlyUpdateStudent = await (countStudent > 0);
    //obtener las provincias para ejecutar la sincronización por cada una para evitar un bloque de carga intenso
    const provincesStudents = await Province.findAll({attributes: ['id']});
    //Sincronizar los estudiantes por cada provincia
    if (provincesStudents) {
        for (const itemProvStudent of provincesStudents) {
            //Obtención de los datos necesarios del sigies
            const dataStudents = await getStudentsSigies(onlyUpdateStudent, itemProvStudent.id);

            const totalStudentsProvince = dataStudents.length;
            let start = 0; //Índice donde empieza la extracción. El primer elemento corresponde con el índice  0.
            let end = 500; //Índice  que marca el final de la extracción. slice extrae hasta, pero sin incluir el final.
            let step = 500; //paso o total de elementos a procesar por grupos
            while (start < totalStudentsProvince) {

                if (end > totalStudentsProvince) {
                    end = totalStudentsProvince;
                }

                //dividir en grupos de elementos el arreglo principal para procesarlo
                let processDataStudent = await dataStudents.slice(start, end);

                //ejecución del proceso de sincronización
                const responseStudent = await syncToStudent(res, processDataStudent);

                if (!responseStudent) {
                    resultStudent = false;
                }

                start += step;
                end += step;
            }
        }
    }

    result['Student'] = resultStudent;

    console.log('   ****** => Finished Sync with StudentTable');

    await logSync.update({status: statusSync.OK, result: result});
    standardResponse(responseTypes._200_SUCCESS, "", result, res);
    console.log('Finished Sync with SIGIES');
};

/**
 * Función para ejecutar la sincronización de la tabla ActiveProcess
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncActiveProcess = async (req, res) => {

    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.ACTIVE_PROCESS,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //Obtención de los datos necesarios del sigies
    const data = await getOpenProcessSigies();

    //ejecución del proceso de sincronización
    const result = await syncToActiveProcess(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }

};

/**
 * Función para ejecutar la sincronización de la tabla ScienceAreas
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncScienceAreas = async (req, res) => {

    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.SCIENCE_AREA,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de areas de la ciencia registrada es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countScienceArea = await ScienceArea.count();
    const onlyUpdate = await (countScienceArea > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getScienceAreasSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToScienceArea(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla Careers
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncCareers = async (req, res) => {
    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.CAREER,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de carreras registrada es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countCareer = await Career.count();
    const onlyUpdate = await (countCareer > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getCareersSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToCareer(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla Provinces
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncProvinces = async (req, res) => {
    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.PROVINCE,
        status: statusSync.PROCESS
    });
    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de provincias registrada es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countProvince = await Province.count();
    const onlyUpdate = await (countProvince > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getProvincesSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToProvince(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla EducationCenters
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncEducationCenters = async (req, res) => {
    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.EDUCATION_CENTER,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de centros de educación superior(CES) registrada es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countEducationCenter = await EducationCenter.count();
    const onlyUpdate = await (countEducationCenter > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getEducationCentersSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToEducationCenter(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla IncomeSources
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncIncomeSources = async (req, res) => {
    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.INCOME_SOURCE,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de vías de ingreso registrada es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countIncomeSource = await IncomeSource.count();
    const onlyUpdate = await (countIncomeSource > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getIncomeSourcesSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToIncomeSource(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla PlacePlan para una provincia especifica
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncPlacePlansByProvince = async (req, res) => {
    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.PLACE_PLAN,
        status: statusSync.PROCESS
    });
    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //Parámetro provincia id
    const provinceId = await req.params.id;

    //verificar que si la cantidad de plazas del plan de una provincia(o todas) es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countPlacePlan = await PlacePlan.count({where: {'provinceId': provinceId}});
    const onlyUpdate = await (countPlacePlan > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getPlacePlanCareerProsecutionsByProvinceSigies(onlyUpdate, provinceId);

    //ejecución del proceso de sincronización
    const result = await syncToPlacePlan(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla PlacePlan
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncPlacePlans = async (req, res) => {
    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.PLACE_PLAN,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de plazas del plan es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countPlacePlan = await PlacePlan.count();
    const onlyUpdate = await (countPlacePlan > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getPlacePlanCareerProsecutionsSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToPlacePlan(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla Student
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncStudents = async (req, res) => {
    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.STUDENT,
        status: statusSync.PROCESS
    });
    //verificar que si la cantidad de estudiantes es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countStudent = await Student.count();
    const onlyUpdate = await (countStudent > 0);

    //obtener las provincias para ejecutar la sincronización de estudiantes por cada una para evitar un bloque de carga intenso
    const provinces = await Province.findAll({attributes: ['id']});

    //variables para contar todos los procesos de sincronización
    let totalNew = 0;
    let totalUpdate = 0;
    let totalNoChange = 0;
    let totalDelete = 0;

    //Sincronizar los estudiantes por cada provincia
    if (provinces) {
        for (const item of provinces) {
            console.log("**********   BEGIN SYNC PROVINCE " + item.id + "   ***********");

            //Obtención de los datos necesarios del sigies
            const data = await getStudentsSigies(onlyUpdate, item.id);

            const totalStudentsProvince = data.length;

            let start = 0; //Índice donde empieza la extracción. El primer elemento corresponde con el índice  0.
            let end = 500; //Índice  que marca el final de la extracción. slice extrae hasta, pero sin incluir el final.
            let step = 500; //paso o total de elementos a procesar por grupos
            while (start < totalStudentsProvince) {

                if (end > totalStudentsProvince) {
                    end = totalStudentsProvince;
                }

                //dividir en grupos de elementos el arreglo principal para procesarlo
                let processData = await data.slice(start, end);

                //ejecución del proceso de sincronización
                const result = await syncToStudent(res, processData);

                //acumular los procesos realizados
                if (result) {
                    totalNew = totalNew + result.totalNew;
                    totalUpdate = totalUpdate + result.totalUpdate;
                    totalNoChange = totalNoChange + result.totalNoChange;
                    totalDelete = totalDelete + result.totalDelete;
                }

                start += step;
                end += step;
            }
            console.log("**********   END SYNC PROVINCE " + item.id + "   ***********");
        }
    }

    const totalResult = {
        totalNew: totalNew,
        totalNoChange: totalNoChange,
        totalUpdate: totalUpdate,
        totalDelete: totalDelete
    };

    await logSync.update({status: statusSync.OK, result: totalResult});

    standardResponse(responseTypes._200_SUCCESS, "", totalResult, res);
};

/**
 * Función para ejecutar la sincronización de la tabla Commission
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncCommissions = async (req, res) => {

    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.COMMISSION,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de areas de la ciencia registrada es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countCommission = await Commission.count();
    const onlyUpdate = await (countCommission > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getCommissionsSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToCommission(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla Municipality
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncMunicipalities = async (req, res) => {

    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.MUNICIPALITY,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de areas de la ciencia registrada es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countMunicipality = await Municipality.count();
    const onlyUpdate = await (countMunicipality > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getMunicipalitiesSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToMunicipality(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla Preuniversity
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncPreuniversities = async (req, res) => {

    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.PREUNIVERSITY,
        status: statusSync.PROCESS
    });

    //Si se envia true la función de sincronizar realizará la respuesta formateada, sino devuelve true al ejecutar los procesos
    const response = true;

    //verificar que si la cantidad de areas de la ciencia registrada es mayor que 0 solo buscar los elementos del sigies que apliquen cambios
    const countPreuniversity = await Preuniversity.count();
    const onlyUpdate = await (countPreuniversity > 0);

    //Obtención de los datos necesarios del sigies
    const data = await getPreuniversitiesSigies(onlyUpdate);

    //ejecución del proceso de sincronización
    const result = await syncToPreuniversity(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 * Función para ejecutar la sincronización de la tabla EducationCenterCareers
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const syncEducationCenterCareers = async (req, res) => {
    const logSync = await Syncronization.create({
        userId: (req.userId) ? req.userId : null,
        type: modelTypeSync.EDUCATION_CENTER_CAREER,
        status: statusSync.PROCESS
    });

    const response = true;

    //Obtención de los datos necesarios del sigies
    const data = await getTerritorialLinksSigies();

    //ejecución del proceso de sincronización
    const result = await syncToEducationCenterCareer(res, data, response);
    await logSync.update({status: statusSync.OK, result: result});

    if (!response) {
        standardResponse(responseTypes._200_SUCCESS, "", result, res);
    }
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<string|*>}
 */
const getSyncronizationsAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, userId, status, type, createdAt} = req.query;

    let search = {
        include: [{
            attributes: ['id', 'firstName', 'lastName'],
            model: User,
            required: false,
        }],
        where: {},
    };

    if (userId) search.where['userId'] = userId;
    if (status) search.where['status'] = status;
    if (type) search.where['type'] = type;
    if (createdAt) {
        const date = moment(createdAt, 'YYYY-MM-DD');
        search.where['createdAt'] = {
            [Op.between]: [
                date.clone().startOf('day'),
                date.clone().endOf('day')
            ],
        };
    }

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {

        return records.map(record => {
            return {
                id: record.id,
                userId: record.userId,
                userFullName: record.User ? record.User.firstName + ' ' + record.User.lastName : null,
                status: record.status,
                statusLabel: getStatusSyncLabelById(record.status),
                type: record.type,
                typeLabel: getTypeSyncLabelById(record.type),
                result: record.result,
                createdAt: record.createdAt,
                // createdAt: moment(record.createdAt).format('D-M-Y h:mm:ss A'),
            }
        });
    };

    const items = await paginate(Syncronization, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<string|*>}
 */
const getSyncronizationByIdAdmin = async (req, res) => {
    const item = await Syncronization.findByPk(req.params.id, {
        include: [{
            attributes: ['id', 'firstName', 'lastName'],
            model: User,
            required: false,
        }],
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const getSyncStatus = async (req, res) => {
    const items = [
        {
            id: statusSync.OK,
            name: getStatusSyncLabelById(statusSync.OK)
        },
        {
            id: statusSync.PROCESS,
            name: getStatusSyncLabelById(statusSync.PROCESS)
        },
        {
            id: statusSync.ERROR,
            name: getStatusSyncLabelById(statusSync.ERROR)
        },
    ];

    standardResponse(responseTypes._200_SUCCESS, "", items, res);
};


module.exports = {
    sync,
    syncActiveProcess,
    syncScienceAreas,
    syncCareers,
    syncProvinces,
    syncEducationCenters,
    syncIncomeSources,
    syncPlacePlans,
    syncPlacePlansByProvince,
    syncStudents,
    syncComplete,
    syncCommissions,
    syncMunicipalities,
    syncPreuniversities,
    syncEducationCenterCareers,
    getSyncronizationsAdmin,
    getSyncronizationByIdAdmin,
    getSyncStatus
};
