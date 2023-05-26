const {Router} = require('express');
const router = Router();

const sectionController = require('../controllers/section.controller');

router.get('/', sectionController.getSections);

module.exports = router;
