const {Router} = require('express');
const router = Router();

const scienceAreaController = require('../controllers/scienceArea.controller');

router.get('/', scienceAreaController.getScienceAreas);
router.get('/:id', scienceAreaController.getScienceAreaById);

module.exports = router;
