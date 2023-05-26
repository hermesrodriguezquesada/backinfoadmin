const {Op} = require('sequelize');
const {PlacePlan, ScienceArea, Province, IncomeSource, Career, EducationCenter} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getPlacePlanCareerPublicInfo = (record) => {
    let item = {
        id: record.id,
        careerId: record.careerId,
        incomeSourceId: record.incomeSourceId,
        provinceId: record.provinceId,
        educationCenterId: record.educationCenter,
        gender: record.gender,
        modality: record.modality,
        initialCapacity: record.initialCapacity,
        Career: record.Career
            ? {
                id: record.Career.id,
                name: record.Career.name,
                shortDescription: record.Career.shortDescription,
                description: record.Career.description,
                teachingFramework: record.Career.teachingFramework,
                studyPlan: record.Career.studyPlan ? `${process.env.APP_DOMAIN}/plans/${record.Career.studyPlan}` : null,
                ScienceArea: record.Career.ScienceArea
                    ? {
                        id: record.Career.ScienceArea.id,
                        name: record.Career.ScienceArea.name
                    }
                    : null,
            }
            : null,
        Province: record.Province
            ? {
                id: record.Province.id,
                name: record.Province.name
            }
            : null,
        IncomeSource: record.IncomeSource
            ? {
                id: record.IncomeSource.id,
                name: record.IncomeSource.name
            }
            : null,
        EducationCenter: record.EducationCenter
            ? {
                id: record.EducationCenter.id,
                name: record.EducationCenter.name
            }
            : null,
    };

    return item;
};

const getPlacePlanCareer = async (req, res) => {
    const {page, limit, order_by, order_direction, name, provinceId, scienceAreaId, incomeSourceId, educationCenterId} = req.query;

    let scienceAreaRelation = {};

    if (scienceAreaId) {
        scienceAreaRelation = {
            model: ScienceArea,
            required: true,
            where: {id: scienceAreaId}
        };
    }
    else {
        scienceAreaRelation = {
            model: ScienceArea,
            required: true
        };
    }

    let careerRelation = {};

    if (name) {
        careerRelation = {
            model: Career,
            required: true,
            where: {name: {[Op.iLike]: `%${name}%`}},
            include: [
                scienceAreaRelation
            ],
        };
    }
    else {
        careerRelation = {
            model: Career,
            required: true,
            include: [
                scienceAreaRelation
            ],
        };
    }

    let provinceRelation = {};

    if (provinceId) {
        provinceRelation = {
            model: Province,
            required: true,
            where: {id: provinceId}
        };
    }
    else {
        provinceRelation = {
            model: Province,
            required: true
        };
    }

    let incomeSourceRelation = {};

    if (incomeSourceId) {
        incomeSourceRelation = {
            model: IncomeSource,
            required: true,
            where: {id: incomeSourceId}
        };
    }
    else {
        incomeSourceRelation = {
            model: IncomeSource,
            required: true
        };
    }

    let educationCenterRelation = {};

    if (educationCenterId) {
        educationCenterRelation = {
            model: EducationCenter,
            required: true,
            where: {id: educationCenterId}
        };
    }
    else {
        educationCenterRelation = {
            model: EducationCenter,
            required: true
        };
    }

    let search = {
        include: [
            provinceRelation,
            incomeSourceRelation,
            careerRelation,
            educationCenterRelation
        ],
    };

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            return getPlacePlanCareerPublicInfo(record);
        });
    };

    const items = await paginate(PlacePlan, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getPlacePlanCareerById = async (req, res) => {
    const item = await PlacePlan.findByPk(req.params.id, {
        include: [
            {
                model: Career,
                required: true,
                include: [
                    {
                        model: ScienceArea,
                        required: true
                    },
                ]
            },
            {
                model: Province,
                required: true
            },
            {
                model: IncomeSource,
                required: true
            },
            {
                model: EducationCenter,
                required: true
            },
        ]
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", getPlacePlanCareerPublicInfo(item.toJSON()), res);
};

module.exports = {
    getPlacePlanCareerById,
    getPlacePlanCareer
};
