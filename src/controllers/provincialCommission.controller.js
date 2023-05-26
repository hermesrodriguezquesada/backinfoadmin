const {body, validationResult} = require('express-validator');
const {Op} = require('sequelize');
const {ProvincialCommission} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, filterActive} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getProvincialCommissionPublicInfo = (record) => {
    return {
        id: record.id,
        name: record.name,
        phone: record.phone,
        email: record.email,
        address: record.address,
    };
};

const createProvincialCommission = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const {name, phone, email, address, active} = req.body;
    const item = await ProvincialCommission.create({name, phone, email, address, active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const getProvincialCommissions = async (req, res) => {
    const {page, limit, order_by, order_direction} = req.query;

    let search = {
        where: {active: true},
    };

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            return getProvincialCommissionPublicInfo(record);
        });
    };

    const items = await paginate(ProvincialCommission, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getProvincialCommissionById = async (req, res) => {
    const item = await ProvincialCommission.findByPk(req.params.id, {
        where: {active: true},
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", getProvincialCommissionPublicInfo(item), res);
};

const getProvincialCommissionsAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, name, phone, email, address, active} = req.query;

    let search = {
        where: {},
    };

    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (phone) search.where['phone'] = {[Op.iLike]: `%${phone}%`};
    if (email) search.where['email'] = {[Op.iLike]: `%${email}%`};
    if (address) search.where['address'] = {[Op.iLike]: `%${address}%`};
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const items = await paginate(ProvincialCommission, page, limit, search, order, null);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getProvincialCommissionByIdAdmin = async (req, res) => {
    const item = await ProvincialCommission.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateProvincialCommissionById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await ProvincialCommission.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {name, phone, email, address, active} = req.body;

    await item.update({name, phone, email, address, active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const deleteProvincialCommissionById = async (req, res) => {
    const item = await ProvincialCommission.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    await item.destroy();
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const validateProvincialCommission = (method) => {
    switch (method) {
        case 'createProvincialCommission': {
            return [
                body('name').exists().isString().not().isEmpty(),
                body('phone').isString(),
                body('email').exists().isEmail(),
                body('address').isString(),
                body('active').exists().isBoolean(),
            ]
        }

        case 'updateProvincialCommissionById': {
            return [
                body('name').exists().isString().not().isEmpty(),
                body('phone').isString(),
                body('email').exists().isEmail(),
                body('address').isString(),
                body('active').exists().isBoolean(),
            ]
        }
    }
};

module.exports = {
    createProvincialCommission,
    getProvincialCommissions,
    getProvincialCommissionById,
    getProvincialCommissionsAdmin,
    getProvincialCommissionByIdAdmin,
    updateProvincialCommissionById,
    validateProvincialCommission,
    deleteProvincialCommissionById,
};
