const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');

const {
    validateEntranceExamSchedule, createEntranceExamSchedule, getEntranceExamSchedulesAdmin,
    getEntranceExamScheduleByIdAdmin, updateEntranceExamScheduleById, deleteEntranceExamScheduleById,
} = require('../../controllers/entranceExamSchedule.controller');

router.post(
    '/',
    verifyToken,
    requiredPermissions('CREATE_ENTRANCE_EXAM_SCHEDULE'),
    validateEntranceExamSchedule('createEntranceExamSchedule'),
    createEntranceExamSchedule
);

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_ENTRANCE_EXAM_SCHEDULE'),
    getEntranceExamSchedulesAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_ENTRANCE_EXAM_SCHEDULE'),
    getEntranceExamScheduleByIdAdmin
);


router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_ENTRANCE_EXAM_SCHEDULE'),
    validateEntranceExamSchedule('updateEntranceExamScheduleById'),
    updateEntranceExamScheduleById
);

router.delete(
    '/:id',
    verifyToken,
    requiredPermissions('DELETE_ENTRANCE_EXAM_SCHEDULE'),
    deleteEntranceExamScheduleById
);

module.exports = router;
