const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');

const {
    validateTeleclassSchedule, createTeleclassSchedule, getTeleclassSchedulesAdmin, getTeleclassScheduleByIdAdmin,
    updateTeleclassScheduleById, deleteTeleclassScheduleById,
} = require('../../controllers/teleclassSchedule.controller');

router.post(
    '/',
    verifyToken,
    requiredPermissions('CREATE_TELECLASS_SCHEDULE'),
    validateTeleclassSchedule('createTeleclassSchedule'),
    createTeleclassSchedule
);

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_TELECLASS_SCHEDULE'),
    getTeleclassSchedulesAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_TELECLASS_SCHEDULE'),
    getTeleclassScheduleByIdAdmin
);

router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_TELECLASS_SCHEDULE'),
    validateTeleclassSchedule('updateTeleclassScheduleById'),
    updateTeleclassScheduleById
);

router.delete(
    '/:id',
    verifyToken,
    requiredPermissions('DELETE_TELECLASS_SCHEDULE'),
    deleteTeleclassScheduleById
);

module.exports = router;
