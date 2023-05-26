const {Router} = require('express');
const router = Router();

const {getAnnouncements} = require('../controllers/announcement.controller');

router.get('/', getAnnouncements);

module.exports = router;
