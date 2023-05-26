const {Router} = require('express');
const router = Router();

const activeProcessController = require('../controllers/activeProcess.controller');

router.get('/', activeProcessController.getActiveProcess);

module.exports = router;
