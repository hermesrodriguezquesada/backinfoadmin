const {Router} = require('express');
const router = Router();

const {getPlacePlanCareer, getPlacePlanCareerById} = require('../controllers/placePlan.controller');

router.get('/', getPlacePlanCareer);

router.get('/:id', getPlacePlanCareerById);

module.exports = router;
