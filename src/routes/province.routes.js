const {Router} = require('express');
const router = Router();

const provinceController = require('../controllers/province.controller');

router.get('/', provinceController.getProvinces);

module.exports = router;
