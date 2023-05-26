const {body, validationResult} = require('express-validator');
const {TeleclassSchedule, Subject, Channel} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, filterActive} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getTeleclassSchedulePublicInfo = (record) => {
    let item = {
        name: record.name,
        slug: record.slug,
    };

    if (record.TeleclassSchedules.length) {
        item['TeleclassSchedules'] = record.TeleclassSchedules.map(i => {
            let temp = {
                id: i.id,
                subjectId: i.subjectId,
                channelId: i.channelId,
                frequency: i.frequency,
                time: i.time,
            };

            if (i.Channel) {
                temp['Channel'] = {
                    id: i.Channel.id,
                    name: i.Channel.name,
                    slug: i.Channel.slug,
                }
            }

            return temp;
        });
    }

    return item;
};

const createTeleclassSchedule = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const {subjectId, channelId, frequency, time, active} = req.body;
    const item = await TeleclassSchedule.create({subjectId, channelId, frequency, time, active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const getTeleclassSchedules = async (req, res) => {
    const {page, limit, order_by, order_direction, subjectId} = req.query;

    let whereSubject = {active: true};
    if (subjectId) whereSubject['id'] = subjectId;

    let search = {
        include: [{
            model: TeleclassSchedule,
            required: true,
            where: {active: true},
            include: [{
                model: Channel,
            }]
        }],
        where: whereSubject,
    };

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            return getTeleclassSchedulePublicInfo(record);
        });
    };

    const items = await paginate(Subject, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getTeleclassScheduleById = async (req, res) => {
    const item = await TeleclassSchedule.findByPk(req.params.id, {
        include: [{
            model: Subject,
            required: true,
        }, {
            model: Channel,
            required: true,
        }],
        where: {active: true},
    });

    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const customItem = {
        id: item.id,
        subjectId: item.subjectId,
        channelId: item.channelId,
        frequency: item.frequency,
        time: item.time,
        Subject: {
            id: item.Subject.id,
            name: item.Subject.name,
            slug: item.Subject.slug,
        },
        Channel: {
            id: item.Channel.id,
            name: item.Channel.name,
            slug: item.Channel.slug,
        },
    };

    return standardResponse(responseTypes._200_SUCCESS, "", customItem, res);
};

const getTeleclassSchedulesAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, subjectId, channelId, active} = req.query;

    let search = {
        include: [{
            model: Subject,
        }, {
            model: Channel,
        }],
        where: {},
    };

    if (subjectId) search.where['subjectId'] = subjectId;
    if (channelId) search.where['channelId'] = channelId;
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const items = await paginate(TeleclassSchedule, page, limit, search, order, null);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getTeleclassScheduleByIdAdmin = async (req, res) => {
    const item = await TeleclassSchedule.findByPk(req.params.id, {
        include: [{
            model: Subject,
        }, {
            model: Channel,
        }],
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateTeleclassScheduleById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await TeleclassSchedule.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {subjectId, channelId, frequency, time, active} = req.body;

    await item.update({subjectId, channelId, frequency, time, active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const deleteTeleclassScheduleById = async (req, res) => {
    const item = await TeleclassSchedule.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    await item.destroy();
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};


const validateTeleclassSchedule = (method) => {
    switch (method) {
        case 'createTeleclassSchedule': {
            return [
                body('subjectId').exists().isInt(),
                body('channelId').exists().isInt(),
                body('frequency').exists().isString().not().isEmpty(),
                body('time').exists().isString().not().isEmpty(),
                body('active').exists().isBoolean(),
            ]
        }

        case 'updateTeleclassScheduleById': {
            return [
                body('subjectId').exists().isInt(),
                body('channelId').exists().isInt(),
                body('frequency').exists().isString().not().isEmpty(),
                body('time').exists().isString().not().isEmpty(),
                body('active').exists().isBoolean(),
            ]
        }
    }
};

module.exports = {
    createTeleclassSchedule,
    getTeleclassSchedules,
    getTeleclassScheduleById,
    getTeleclassSchedulesAdmin,
    getTeleclassScheduleByIdAdmin,
    updateTeleclassScheduleById,
    validateTeleclassSchedule,
    deleteTeleclassScheduleById,
};
