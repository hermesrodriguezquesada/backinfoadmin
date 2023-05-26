const {Router} = require('express');
const router = Router();

const {getSubjects} = require('../controllers/subject.controller');

router.get('/', getSubjects);

module.exports = router;
