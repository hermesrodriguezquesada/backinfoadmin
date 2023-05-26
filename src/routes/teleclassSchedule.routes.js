const {Router} = require('express');
const router = Router();

const {getTeleclassSchedules, getTeleclassScheduleById} = require('../controllers/teleclassSchedule.controller');

router.get('/', getTeleclassSchedules);

router.get('/:id', getTeleclassScheduleById);

module.exports = router;
