const {Router} = require('express');
const router = Router();

const crontaskLogController = require('../controllers/crontaskLog.controller');

router.get('/', crontaskLogController.getCrontaskLogs);

module.exports = router;
