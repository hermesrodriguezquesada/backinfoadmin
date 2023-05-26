const {body, validationResult} = require('express-validator');
const moment = require('moment');
const {EntranceExamSchedule, Subject, Announcement} = require('../database/models');
const {NotFoundError, ErrorMessage} = require('../exceptions');
const {responseTypes, standardResponse, filterActive} = require('../utils/globalUtils');
const {paginate} = require('../libs/paginate');

const getEntranceExamSchedulePublicInfo = (record) => {
    return {
        id: record.id,
        subjectId: record.subjectId,
        announcementId: record.announcementId,
        Subject: record.Subject
            ? {
                id: record.Subject.id,
                name: record.Subject.name,
                slug: record.Subject.slug,
            }
            : null,
        Announcement: record.Announcement
            ? {
                id: record.Announcement.id,
                name: record.Announcement.name,
            }
            : null,
        date: record.date,
    };
};

const createEntranceExamSchedule = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const {subjectId, announcementId, date, active} = req.body;
    const customDate = moment(date, 'YYYY-MM-DD');

    const item = await EntranceExamSchedule.create({subjectId, announcementId, date: customDate, active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const getEntranceExamSchedules = async (req, res) => {
    const {page, limit, order_by, order_direction, subjectId, announcementId} = req.query;
    let search = {
        include: [{
            model: Subject,
            required: true,
        }, {
            model: Announcement,
            required: true,
        }],
        where: {active: true},
    };

    if (subjectId) search.where['subjectId'] = subjectId;
    if (announcementId) search.where['announcementId'] = announcementId;

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const transform = (records) => {
        return records.map(record => {
            return getEntranceExamSchedulePublicInfo(record);
        });
    };

    const items = await paginate(EntranceExamSchedule, page, limit, search, order, transform);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getEntranceExamScheduleById = async (req, res) => {
    const item = await EntranceExamSchedule.findByPk(req.params.id, {
        include: [{
            model: Subject,
            required: true,
        }, {
            model: Announcement,
            required: true,
        }],
        where: {active: true},
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    return standardResponse(responseTypes._200_SUCCESS, "", getEntranceExamSchedulePublicInfo(item), res);
};

const getEntranceExamSchedulesAdmin = async (req, res) => {
    const {page, limit, order_by, order_direction, subjectId, announcementId, active} = req.query;

    let search = {
        include: [{
            model: Subject,
            required: true,
        }, {
            model: Announcement,
            required: true,
        }],
        where: {},
    };

    if (subjectId) search.where['subjectId'] = subjectId;
    if (announcementId) search.where['announcementId'] = announcementId;
    if (active) search.where = await filterActive(active, search.where);

    let order = [];
    if (order_by && order_direction) {
        order.push([order_by, order_direction]);
    }

    const items = await paginate(EntranceExamSchedule, page, limit, search, order, null);

    return standardResponse(responseTypes._200_SUCCESS, "", items, res);
};

const getEntranceExamScheduleByIdAdmin = async (req, res) => {
    const item = await EntranceExamSchedule.findByPk(req.params.id, {
        include: [{
            model: Subject,
            required: true,
        }, {
            model: Announcement,
            required: true,
        }],
    });
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const updateEntranceExamScheduleById = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return standardResponse(responseTypes._422_UNPROCESSABLE_ENTITY, "", {errors: errors.array()}, res);
    }

    const item = await EntranceExamSchedule.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);

    const {subjectId, announcementId, date, active} = req.body;
    const customDate = moment(date, 'YYYY-MM-DD');

    await item.update({subjectId, announcementId, date: customDate, active});

    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};

const deleteEntranceExamScheduleById = async (req, res) => {
    const item = await EntranceExamSchedule.findByPk(req.params.id);
    if (!item) throw new NotFoundError(ErrorMessage.NOT_FOUND);
    await item.destroy();
    return standardResponse(responseTypes._200_SUCCESS, "", item, res);
};


const validateEntranceExamSchedule = (method) => {
    switch (method) {
        case 'createEntranceExamSchedule': {
            return [
                body('subjectId').exists().isInt(),
                body('announcementId').exists().isInt(),
                body('date').exists().isString(),
                body('active').exists().isBoolean(),
            ]
        }

        case 'updateEntranceExamScheduleById': {
            return [
                body('subjectId').exists().isInt(),
                body('announcementId').exists().isInt(),
                body('date').exists().isString(),
                body('active').exists().isBoolean(),
            ]
        }
    }
};

module.exports = {
    createEntranceExamSchedule,
    getEntranceExamSchedules,
    getEntranceExamScheduleById,
    getEntranceExamSchedulesAdmin,
    getEntranceExamScheduleByIdAdmin,
    updateEntranceExamScheduleById,
    validateEntranceExamSchedule,
    deleteEntranceExamScheduleById,
};
