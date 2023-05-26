const {Router} = require('express');
const router = Router();

const {getProvincialCommissions, getProvincialCommissionById} = require('../controllers/provincialCommission.controller');

router.get('/', getProvincialCommissions);

router.get('/:id', getProvincialCommissionById);

module.exports = router;
