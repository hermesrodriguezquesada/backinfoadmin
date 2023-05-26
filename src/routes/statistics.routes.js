const {Router} = require('express');
const router = Router();
const statisticsController = require('../controllers/statistics.controller');

router.get('/dashboard', statisticsController.getDashboard);

module.exports = router;
