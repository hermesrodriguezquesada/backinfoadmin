const {Router} = require('express');
const router = Router();

const {getChannels} = require('../controllers/channel.controller');

router.get('/', getChannels);

module.exports = router;
