const {body, validationResult} = require('express-validator');
const {Op} = require('sequelize');
const fs = require('fs-extra');
const path = require('path');
const {Career, ScienceArea, Province} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, PLANS_LOCATION, filterActive} = require('../utils/globalUtils');
const {getCutsCareer, getCutsAverageCareer} = require('../utils/sigiesUtils');
const {paginate} = require('../libs/paginate');

const getCareerPublicInfo = (record) => {
    let item = {
        id: record.id,
        name: record.name,
        code: record.code,
        shortDescription: record.shortDescription,
        description: record.description,
        scienceAreaId: record.scienceAreaId,
        teachingFramework: record.teachingFramework,
        studyPlan: record.studyPlan ? `${process.env.APP_DOMAIN}/plans/${record.studyPlan}` : null,
        ScienceArea: record.ScienceArea
            ? {
                id: record.ScienceArea.id,
                name: record.ScienceArea.name,
                code: record.ScienceArea.code,
            }
            : null,
    };
    if (record.EducationCenterCareer) {
        item.EducationCenterCareer = {
            isCertified: record.EducationCenterCareer.isCertified,
            certificationLevel: record.EducationCenterCareer.certificationLevel,
        };
    }
    return item;
};

const getCareers = async (req, res) => {
    const {page, limit, order_by, order_direction, name, area, framework} = req.query;

    let search = {
        include: [{
            model: ScienceArea,
            required: true,
        }],
        where: {active: true},
    };

    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (area) search.where['scienceAreaId'] = area;
    if (framework) search.where['teachingFramework'] = {[Op.iLike]: `%${framework}%`};

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            return getCareerPublicInfo(record);
        });
    };

    const items = await paginate(Career, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getCareerById = async (req, res) => {
    const item = await Career.findByPk(req.params.id, {
        include: [{
            model: ScienceArea,
            required: true,
        }],
        where: {active: true},
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", getCareerPublicInfo(item.toJSON()), res);
};

const getCareersAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, name, code, area, framework, active} = req.query;

    let search = {
        include: [{
            model: ScienceArea,
            required: true,
        }],
        where: {},
    };

    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (code) search.where['code'] = {[Op.iLike]: `%${code}%`};
    if (area) search.where['scienceAreaId'] = area;
    if (framework) search.where['teachingFramework'] = {[Op.iLike]: `%${framework}%`};
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            record.studyPlan = record.studyPlan ? `${process.env.APP_DOMAIN}/plans/${record.studyPlan}` : null;
            return record;
        });
    };

    const items = await paginate(Career, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getCareerByIdAdmin = async (req, res) => {
    const item = await Career.findByPk(req.params.id, {
        include: [{
            model: ScienceArea,
            required: true,
        }],
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    item.studyPlan = item.studyPlan ? `${process.env.APP_DOMAIN}/plans/${item.studyPlan}` : null;
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateCareerById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) await fs.unlink(path.resolve(PLANS_LOCATION, req.file.filename));
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await Career.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {description, shortDescription, teachingFramework, active} = req.body;

    let studyPlan = item.studyPlan;
    if (req.file) {
        if (item.studyPlan) {
            await fs.unlink(path.resolve(PLANS_LOCATION, item.studyPlan));
        }
        studyPlan = req.file.filename;
    }

    await item.update({description, shortDescription, teachingFramework, active, studyPlan});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const cleanCareerById = async (req, res) => {
    const item = await Career.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    if (item.studyPlan) await fs.unlink(path.resolve(PLANS_LOCATION, item.studyPlan));
    await item.update({
        description: null,
        shortDescription: null,
        teachingFramework: null,
        active: false,
        studyPlan: null,
    });

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const validateCareer = (method) => {
    switch (method) {
        case 'updateCareerById': {
            return [
                body('description').isString(),
                body('shortDescription').isString(),
                body('teachingFramework').isString(),
                body('active').isBoolean(),
            ]
        }
    }
};

const getCutsCareerByIdAndProvince = async (req, res) => {
    const province = await Province.findByPk(req.params.provinceId, {
        attributes: ['code']
    });

    const career = await Career.findByPk(req.params.careerId, {
        attributes: ['code']
    });

    const item = await getCutsCareer(career.code, province.code);

    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const getCutsAverageCareerByIdAndProvince = async (req, res) => {
    const province = await Province.findByPk(req.params.provinceId, {
        attributes: ['code']
    });

    const career = await Career.findByPk(req.params.careerId, {
        attributes: ['code']
    });

    const item = await getCutsAverageCareer(career.code, province.code);

    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

module.exports = {
    getCareers,
    getCareerById,
    getCareersAdmin,
    getCareerByIdAdmin,
    updateCareerById,
    cleanCareerById,
    validateCareer,
    getCareerPublicInfo,
    getCutsCareerByIdAndProvince,
    getCutsAverageCareerByIdAndProvince
};
