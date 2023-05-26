const {body, validationResult} = require('express-validator');
const {Op} = require('sequelize');
const {ContactType} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, filterActive} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getContactTypesAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, name, active} = req.query;

    let search = {
        where: {},
    };

    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const items = await paginate(ContactType, page, limit, search, order, null);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getContactTypeByIdAdmin = async (req, res) => {
    const item = await ContactType.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateContactTypeById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await ContactType.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {active} = req.body;
    await item.update({active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const validateContactType = (method) => {
    switch (method) {
        case 'updateContactTypeById': {
            return [
                body('active').exists().isBoolean(),
            ]
        }
    }
};

module.exports = {
    getContactTypesAdmin,
    getContactTypeByIdAdmin,
    updateContactTypeById,
    validateContactType,
};
