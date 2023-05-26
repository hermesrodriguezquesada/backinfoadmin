const {Router} = require('express');
const router = Router();

const {getEntranceExamSchedules, getEntranceExamScheduleById} = require('../controllers/entranceExamSchedule.controller');

router.get('/', getEntranceExamSchedules);

router.get('/:id', getEntranceExamScheduleById);

module.exports = router;
