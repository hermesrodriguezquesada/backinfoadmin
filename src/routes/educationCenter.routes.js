const {Router} = require('express');
const router = Router();

const {getEducationCenters, getEducationCenterById} = require('../controllers/educationCenter.controller');

router.get('/', getEducationCenters);

router.get('/:id', getEducationCenterById);

module.exports = router;
