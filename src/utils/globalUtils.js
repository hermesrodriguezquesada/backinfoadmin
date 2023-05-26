const {Op} = require("sequelize");
const {ActiveProcess} = require('../database/models');
const {Province, Career, ScienceArea, EducationCenter, Student, PlacePlan, IncomeSource, Commission, Municipality, Preuniversity, EducationCenterCareer} = require('../database/models');

/**
 * Tipos de respuesta del API
 *
 * @type {{_404_NOTFOUND: string, _500_OPERATION_ERROR: string, _403_FORBIDDEN: string, _400_BADREQUEST: string, _200_SUCCESS: string, _204_ERROR: string, _401_UNAUTHORIZED: string, _422_UNPROCESSABLE_ENTITY: string}}
 */
const responseTypes = {
    _200_SUCCESS: "_200_SUCCESS", //peticiones correctas y sin errores de validación
    _204_ERROR: "_204_ERROR", //peticiones correctas pero vacías
    _400_BADREQUEST: "_400_BADREQUEST", //peticiones incorrectas
    _401_UNAUTHORIZED: "_401_UNAUTHORIZED", //Es necesario autenticar
    _403_FORBIDDEN: "_403_FORBIDDEN", //error de permisos
    _404_NOTFOUND: "_404_NOTFOUND", //Rutas o Elementos no encontrados
    _422_UNPROCESSABLE_ENTITY: "_422_UNPROCESSABLE_ENTITY", //Rutas o Elementos no encontrados
    _500_OPERATION_ERROR: "_500_OPERATION_ERROR" //error de operaciones
};

/**
 * Tipos de limpieza a ejecutar
 *
 * @type {{ALL: number, SCIENCE_AREAS: number, CAREERS: number, PROVINCES: number, PLACE_PLANS: number, EDUCATION_CENTERS: number, INCOME_SOURCES: number, STUDENTS: number, COMMISSION: number, MUNICIPALITY: number, PREUNIVERSITY: number}}
 */
const cleanType = {
    ALL: 1,
    PROVINCES: 2,
    CAREERS: 3,
    SCIENCE_AREAS: 4,
    EDUCATION_CENTERS: 5,
    STUDENTS: 6,
    PLACE_PLANS: 7,
    INCOME_SOURCES: 8,
    COMMISSION: 9,
    MUNICIPALITY: 10,
    PREUNIVERSITY: 11,
    EDUCATION_CENTER_CAREERS: 12
};

/**
 * Tipos de limpieza a ejecutar
 *
 * @type {{ALL: number, SCIENCE_AREA: number, CAREER: number, PROVINCE: number, PLACE_PLAN: number, EDUCATION_CENTER: number, INCOME_SOURCE: number, STUDENT: number, COMMISSION: number, MUNICIPALITY: number, PREUNIVERSITY: number, EDUCATION_CENTER_CAREER: number}}
 */
const modelTypeSync = {
    ALL: 1,
    ACTIVE_PROCESS: 2,
    PROVINCE: 3,
    CAREER: 4,
    SCIENCE_AREA: 5,
    EDUCATION_CENTER: 6,
    STUDENT: 7,
    PLACE_PLAN: 8,
    INCOME_SOURCE: 9,
    COMMISSION: 10,
    MUNICIPALITY: 11,
    PREUNIVERSITY: 12,
    EDUCATION_CENTER_CAREER: 13
};

/**
 * Función para obtener el texto a visualizar según el tipo de sincronización
 *
 * @param typeId
 * @returns {string}
 */
function getTypeSyncLabelById(typeId) {

    switch (typeId) {
        case modelTypeSync.ALL: {
            return "COMPLETA";
            break;
        }

        case modelTypeSync.ACTIVE_PROCESS: {
            return "Procesos Activos";
            break;
        }

        case modelTypeSync.PROVINCE: {
            return "Provincias";
            break;
        }

        case modelTypeSync.CAREER: {
            return "Carreras";
            break;
        }

        case modelTypeSync.SCIENCE_AREA: {
            return "Áreas de las ciencias";
            break;
        }

        case modelTypeSync.EDUCATION_CENTER: {
            return "Centros de educación superior";
            break;
        }

        case modelTypeSync.STUDENT: {
            return "Estudiantes";
            break;
        }

        case modelTypeSync.PLACE_PLAN: {
            return "Plan de plazas";
            break;
        }

        case modelTypeSync.INCOME_SOURCE: {
            return "Vías de ingreso";
            break;
        }

        case modelTypeSync.COMMISSION: {
            return "Comisiones";
            break;
        }

        case modelTypeSync.MUNICIPALITY: {
            return "Municipios";
            break;
        }

        case modelTypeSync.PREUNIVERSITY: {
            return "Preuniversitarios";
            break;
        }

        default: {
            return "DESCONOCIDO";
        }
    }
}

/**
 * Tipos de estado de la sincronización
 *
 * @type {{PROCESS: number, ERROR: number, OK: number}}
 */
const statusSync = {
    OK: 1,
    PROCESS: 2,
    ERROR: 3
};

/**
 * Función para obtener el texto a visualizar según el estado de la sincronización
 *
 * @param statusId
 * @returns {string}
 */
function getStatusSyncLabelById(statusId) {

    switch (statusId) {
        case statusSync.OK: {
            return "COMPLETADA";
            break;
        }

        case statusSync.PROCESS: {
            return "EN PROCESO";
            break;
        }

        case statusSync.ERROR: {
            return "ERROR";
            break;
        }

        default: {
            return "DESCONOCIDO";
        }
    }

}

/**
 *Función que estandariza las respuestas del API
 *
 * @param type
 * @param message
 * @param data
 * @param res
 * @returns {string}
 */
function standardResponse(type, message = "", data = null, res) {
    let response = '';
    let resultMessage = '';

    switch (type) {
        case responseTypes._200_SUCCESS: {
            response = {
                type: "Success",
                message: message ? message : "Query success",
                status: 200,
                data: data,
            };

            break;
        }

        case responseTypes._204_ERROR: {
            if (message === '') {
                resultMessage = "Query success with errors";
            } else {
                resultMessage = message;
            }

            response = {
                type: "Error",
                message: resultMessage,
                status: 204,
                data: data,
            };

            res.status(204);

            break;
        }

        case responseTypes._400_BADREQUEST: {
            response = {
                type: "BADREQUEST",
                message: message,
                status: 400,
                data: data,
            };

            res.status(400);

            break;
        }

        case responseTypes._401_UNAUTHORIZED: {
            response = {
                type: "UNAUTHORIZED",
                message: message,
                status: 401,
                data: data,
            };

            res.status(401);

            break;
        }

        case responseTypes._403_FORBIDDEN: {
            response = {
                type: "FORBIDDEN",
                message: message,
                status: 403,
                data: data,
            };

            res.status(403);

            break;
        }

        case responseTypes._404_NOTFOUND: {
            response = {
                type: "NOTFOUND",
                message: message,
                status: 404,
                data: data,
            };

            res.status(404);

            break;
        }

        case responseTypes._422_UNPROCESSABLE_ENTITY: {
            response = {
                type: "UNPROCESSABLE ENTITY",
                message: message,
                status: 422,
                data: data,
            };

            res.status(422);

            break;
        }

        default: {
            response = {
                type: "Unknown behavior",
                message: message,
                status: 500,
                data: data,
            };

            res.status(500);
        }
    }


    return res.json(response);
}

/**
 *  Función para limpiar las filas de procesos no activos
 *
 * @param type
 */
const cleanTablesInfo = async (type = 1) => {
    let totalDeleted = 0;
    const activeProcess = await ActiveProcess.findOne();
    if (!activeProcess) {
        return false;
    } else {
        //limpiar estudiantes superior si aplica
        if (type === cleanType.ALL || type === cleanType.STUDENTS) {
            Student.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar municipios si aplica
        if (type === cleanType.ALL || type === cleanType.MUNICIPALITY) {
            Municipality.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar provincias si aplica
        if (type === cleanType.ALL || type === cleanType.PROVINCES) {
            const totalItems = await Province.count({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });

            Province.destroy({
                where: {
                    schoolYearId: {
                        [Op.or]: {
                            [Op.ne]: activeProcess.schoolYearId,
                            [Op.is]: null,
                        }

                    }
                }
            });

            totalDeleted = totalDeleted + totalItems;
        }

        //limpiar carreras si aplica
        if (type === cleanType.ALL || type === cleanType.CAREERS) {
            Career.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar áreas de la ciencia si aplica
        if (type === cleanType.ALL || type === cleanType.SCIENCE_AREAS) {
            ScienceArea.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar centros de educación superior si aplica
        if (type === cleanType.ALL || type === cleanType.EDUCATION_CENTERS) {
            EducationCenter.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar plan de plazas si aplica
        if (type === cleanType.ALL || type === cleanType.PLACE_PLANS) {
            PlacePlan.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar vías de ingreso si aplica
        if (type === cleanType.ALL || type === cleanType.INCOME_SOURCES) {
            IncomeSource.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar comisiones si aplica
        if (type === cleanType.ALL || type === cleanType.COMMISSION) {
            Commission.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar preuniversitarios si aplica
        if (type === cleanType.ALL || type === cleanType.PREUNIVERSITY) {
            Preuniversity.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }

        //limpiar vinculaciones territoriales(EducationCenterCareer) si aplica
        if (type === cleanType.ALL || type === cleanType.EDUCATION_CENTER_CAREERS) {
            EducationCenterCareer.destroy({
                where: {
                    schoolYearId: {
                        [Op.ne]: activeProcess.schoolYearId
                    }
                }
            });
        }
    }

    return totalDeleted;
};

const PLANS_LOCATION = 'public/plans';

const IMAGES_LOCATION = 'public/images';

const filterActive = async (value, where) => {
    if (value === 'true') {
        where['active'] = true;
    } else if (value === 'false') {
        where['active'] = {
            [Op.or]: [false, null]
        };
    }
    return where;
};

const contactTypes = {
    PHONE: 'PHONE',
    MOBILE: 'MOBILE',
    EMAIL: 'EMAIL',
    WEB: 'WEB',
    ADDRESS: 'ADDRESS',
    SOCIAL: 'SOCIAL',
    FAX: 'FAX',
};

const contactCategory = {
    ENTITY: 1,
    RECTOR: 2,
};

const socialTypes = {
    Facebook: 1,
    YouTube: 2,
    WhatsApp: 3,
    Instagram: 4,
    TikTok: 5,
    Snapchat: 6,
    Reddit: 7,
    Pinterest: 8,
    Twitter: 9,
    LinkedIn: 10,
};

const resultTypeContactsDiul = {
    ONLY_SOCIAL: 1,
    NO_SOCIAL: 2,
    ALL: 3
};

const customRegexValidator = {
    ONLY_NUMBER: '^[0-9]*$',
    ALPHA_NUMERIC: '^[0-9a-zA-Z _-áéíóúÁÉÍÓÚñÑ]+$',
    EMAIL: '^[a-z0-9._%+-]+@[a-z0-9.-]+[\.]+[a-z]{2,4}$',
    ONLY_LETTERS: '^[a-zA-Z _-áéíóúÁÉÍÓÚ]*$',
    STRONG_PASSWORD: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])([A-Za-z\\d$@$!%*?&]|[^ ]){8,50}$', /* MÍnimo 8 caracteres, Máximo 50 caracteres, Al menos una letra mayúscula, Al menos una letra minúscula, Al menos un dígito, No espacios en blanco, Al menos 1 caracter especial */
};

module.exports = {
    responseTypes,
    standardResponse,
    cleanType,
    cleanTablesInfo,
    statusSync,
    modelTypeSync,
    getStatusSyncLabelById,
    getTypeSyncLabelById,
    PLANS_LOCATION,
    IMAGES_LOCATION,
    filterActive,
    contactTypes,
    contactCategory,
    socialTypes,
    resultTypeContactsDiul,
    customRegexValidator
};

