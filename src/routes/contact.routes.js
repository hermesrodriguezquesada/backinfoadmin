const {Router} = require('express');
const router = Router();

const {getContacts, getContactById} = require('../controllers/contact.controller');

router.get('/', getContacts);

router.get('/:id', getContactById);

module.exports = router;
