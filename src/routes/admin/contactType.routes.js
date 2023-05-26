const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');

const {
    getContactTypesAdmin, getContactTypeByIdAdmin, updateContactTypeById, validateContactType
} = require('../../controllers/contactType.controller');

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_CONTACT_TYPE'),
    getContactTypesAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_CONTACT_TYPE'),
    getContactTypeByIdAdmin
);

router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_CONTACT_TYPE'),
    validateContactType('updateContactTypeById'),
    updateContactTypeById
);

module.exports = router;
