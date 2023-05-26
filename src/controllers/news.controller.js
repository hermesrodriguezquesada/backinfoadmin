const {body, validationResult} = require('express-validator');
const {Op} = require('sequelize');
const fs = require('fs-extra');
const path = require('path');
const {News, Section} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, IMAGES_LOCATION, filterActive} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getNewsPublicInfo = (record) => {
    return {
        id: record.id,
        name: record.name,
        description: record.description,
        image: record.image ? `${process.env.APP_DOMAIN}/images/${record.image}` : null,
        sectionId: record.sectionId,
        createdAt: record.createdAt,
        Section: record.Section
            ? {
                id: record.Section.id,
                name: record.Section.name,
                code: record.Section.code,
            }
            : null,
    };
};

const createNews = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) await fs.unlink(path.resolve(IMAGES_LOCATION, req.file.filename));
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const {name, description, sectionId, active} = req.body;
    const image = req.file ? req.file.filename : null;
    const news = await News.create({name, description, image, sectionId, active});

    return standardResponse(responseTypes._200_SUCCESS, "", news, res);
};

const getNews = async (req, res) => {
    const {page, limit, order_by, order_direction, name, description, sectionId, code, newsIdExclude} = req.query;
    let search = {};

    if(code)
    {
        search = {
            include: [{
                model: Section,
                required: true,
                where: {code: code}
            }],
            where: {active: true},
        };
    }
    else
    {
        search = {
            include: [{
                model: Section,
                required: true,
            }],
            where: {active: true},
        };
    }

    if (newsIdExclude) search.where['id'] = {[Op.not]: newsIdExclude};
    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (description) search.where['description'] = {[Op.iLike]: `%${description}%`};
    if (sectionId) search.where['sectionId'] = sectionId;

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            return getNewsPublicInfo(record);
        });
    };

    const items = await paginate(News, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getNewsById = async (req, res) => {
    const item = await News.findByPk(req.params.id, {
        include: [{
            model: Section,
            required: true,
        }],
        where: {active: true},
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", getNewsPublicInfo(item), res);
};

const getNewsAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, name, description, sectionId, active} = req.query;

    let search = {
        include: [{
            model: Section,
            required: true,
        }],
        where: {},
    };

    if (name) search.where['name'] = {[Op.iLike]: `%${name}%`};
    if (description) search.where['description'] = {[Op.iLike]: `%${description}%`};
    if (sectionId) search.where['sectionId'] = sectionId;
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            record.image = record.image ? `${process.env.APP_DOMAIN}/images/${record.image}` : null;
            return record;
        });
    };

    const items = await paginate(News, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getNewsByIdAdmin = async (req, res) => {
    const item = await News.findByPk(req.params.id, {
        include: [{
            model: Section,
            required: true,
        }],
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    item.image = item.image ? `${process.env.APP_DOMAIN}/images/${item.image}` : null;
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateNewsById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) await fs.unlink(path.resolve(IMAGES_LOCATION, req.file.filename));
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await News.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {name, description, sectionId, active} = req.body;

    let image = item.image;
    if (req.file) {
        if (item.image) {
            await fs.unlink(path.resolve(IMAGES_LOCATION, item.image));
        }
        image = req.file.filename;
    }

    await item.update({name, description, sectionId, active, image});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const deleteNewsById = async (req, res) => {
    const item = await News.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    if (item.image) {
        await fs.unlink(path.resolve(IMAGES_LOCATION, item.image));
    }
    await item.destroy();
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};


const validateNews = (method) => {
    switch (method) {
        case 'createNews': {
            return [
                body('name').exists().isString().not().isEmpty().isLength({min: 2, max: 255}),
                body('description').exists().isString().not().isEmpty(),
                body('sectionId').exists().isInt(),
                body('active').exists().isBoolean(),
            ]
        }

        case 'updateNewsById': {
            return [
                body('name').exists().isString().not().isEmpty().isLength({min: 2, max: 255}),
                body('description').exists().isString().not().isEmpty(),
                body('sectionId').exists().isInt(),
                body('active').exists().isBoolean(),
            ]
        }
    }
};

module.exports = {
    createNews,
    getNews,
    getNewsById,
    getNewsAdmin,
    getNewsByIdAdmin,
    updateNewsById,
    validateNews,
    deleteNewsById,
};
