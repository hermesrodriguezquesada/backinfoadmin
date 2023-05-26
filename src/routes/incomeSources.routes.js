const {Router} = require('express');
const router = Router();

const incomeSourceController = require('../controllers/incomeSource.controller');

router.get('/', incomeSourceController.getIncomeSources);

module.exports = router;
