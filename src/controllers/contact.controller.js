const {body, validationResult} = require('express-validator');
const {Contact, ContactType} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, filterActive, contactCategory, socialTypes, contactTypes, resultTypeContactsDiul} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');
const {Op, col, fn, QueryTypes} = require("sequelize");

const getContactPublicInfo = (record) => {
    return {
        id: record.id,
        value: record.value,
        category: record.category,
        subtype: record.subtype,
        contactTypeId: record.contactTypeId,
        ContactType: {
            id: record.ContactType.id,
            name: record.ContactType.name,
            slug: record.ContactType.slug,
        }
    };
};

const createContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const {contactTypeId, value, category, subtype, active} = req.body;
    const socialContactType = await ContactType.findByPk(contactTypeId);
    const item = await Contact.create({
        contactTypeId,
        value,
        category,
        subtype: socialContactType.slug === contactTypes.SOCIAL ? subtype : null,
        active
    });

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const getContacts = async (req, res) => {
    const {page, limit, order_by, order_direction, contactTypeId, typeResult} = req.query;
    let search = {};

    if (typeResult) {
        if(typeResult == resultTypeContactsDiul.ONLY_SOCIAL)
        {
            search = {
                include: [{
                    model: ContactType,
                    required: true,
                    where: {slug: contactTypes.SOCIAL}
                }],
                where: {active: true}
            };
        }
        else if(typeResult == resultTypeContactsDiul.NO_SOCIAL)
        {
            search = {
                include: [{
                    model: ContactType,
                    required: true,
                    where: {
                        slug: {[Op.ne]: contactTypes.SOCIAL}
                    }
                }],
                where: {active: true}
            };
        }
        else
        {
            search = {
                include: [{
                    model: ContactType,
                    required: true,
                }],
                where: {active: true}
            };
        }
    }
    else
    {
        search = {
            include: [{
                model: ContactType,
                required: true,
            }],
            where: {active: true}
        };
    }

    if (contactTypeId) search.where['contactTypeId'] = contactTypeId;

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            return getContactPublicInfo(record);
        });
    };

    const items = await paginate(Contact, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getContactById = async (req, res) => {
    const item = await Contact.findByPk(req.params.id, {
        include: [{
            model: ContactType,
            required: true,
        }],
        where: {active: true},
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", getContactPublicInfo(item), res);
};

const getContactsAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, contactTypeId, active} = req.query;

    let search = {
        include: [{
            model: ContactType,
            required: true,
        }],
        where: {},
    };

    if (contactTypeId) search.where['contactTypeId'] = contactTypeId;
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const items = await paginate(Contact, page, limit, search, order, null);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getContactByIdAdmin = async (req, res) => {
    const item = await Contact.findByPk(req.params.id, {
        include: [{
            model: ContactType,
            required: true,
        }],
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateContactById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await Contact.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {contactTypeId, value, category, subtype, active} = req.body;
    const socialContactType = await ContactType.findByPk(contactTypeId);
    await item.update({
        contactTypeId,
        value,
        category,
        subtype: socialContactType.slug === contactTypes.SOCIAL ? subtype : null,
        active
    });

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const deleteContactById = async (req, res) => {
    const item = await Contact.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    await item.destroy();
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const validateContact = (method) => {
    const categories = Object.values(contactCategory);
    const subtypes = Object.values(socialTypes);
    switch (method) {
        case 'createContact': {
            return [
                body('contactTypeId').exists().isInt(),
                body('value').exists().isString(),
                body('category').exists().isInt().isIn(categories),
                body('subtype').optional().isInt().isIn(subtypes),
                body('active').exists().isBoolean(),
            ]
        }

        case 'updateContactById': {
            return [
                body('value').exists().isString(),
                body('category').exists().isInt().isIn(categories),
                body('subtype').optional().isInt().isIn(subtypes),
                body('active').exists().isBoolean(),
            ]
        }
    }
};

module.exports = {
    createContact,
    getContacts,
    getContactById,
    getContactsAdmin,
    getContactByIdAdmin,
    updateContactById,
    validateContact,
    deleteContactById,
};
