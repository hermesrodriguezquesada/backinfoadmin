const {Router} = require('express');
const router = Router();

const {getCareers, getCareerById, getCutsCareerByIdAndProvince, getCutsAverageCareerByIdAndProvince} = require('../controllers/career.controller');

router.get('/', getCareers);

router.get('/:id', getCareerById);

router.get('/cuts/:careerId/:provinceId', getCutsCareerByIdAndProvince);
router.get('/cuts-average/:careerId/:provinceId', getCutsAverageCareerByIdAndProvince);

module.exports = router;
