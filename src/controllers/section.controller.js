const {body, validationResult} = require('express-validator');
const {Op} = require('sequelize');
const {Section} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, filterActive} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getSectionPublicInfo = (record) => {
    return {
        id: record.id,
        name: record.name,
        code: record.code,
    };
};

const getSections = async (req, res) => {
    const {page, limit, order_by, order_direction, name, code} = req.query;

    let search = {
        where: {active: true},
    };

    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (code) search.where['code'] = {[Op.iLike]: `%${code}%`};

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            return getSectionPublicInfo(record);
        });
    };

    const items = await paginate(Section, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getSectionsAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, name, code, active} = req.query;

    let search = {
        where: {},
    };

    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (code) search.where['code'] = {[Op.iLike]: `%${code}%`};
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const items = await paginate(Section, page, limit, search, order, null);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getSectionByIdAdmin = async (req, res) => {
    const item = await Section.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateSectionById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await Section.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {active} = req.body;

    await item.update({active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const validateSection = (method) => {
    switch (method) {
        case 'updateSectionById': {
            return [
                body('active').exists().isBoolean(),
            ]
        }
    }
};

module.exports = {
    getSections,
    getSectionsAdmin,
    getSectionByIdAdmin,
    updateSectionById,
    validateSection,
};
