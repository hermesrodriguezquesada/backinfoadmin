const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');

const {
    validateContact, createContact, getContactsAdmin, getContactByIdAdmin, updateContactById, deleteContactById,
} = require('../../controllers/contact.controller');

router.post(
    '/',
    verifyToken,
    requiredPermissions('CREATE_CONTACT'),
    validateContact('createContact'),
    createContact
);

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_CONTACT'),
    getContactsAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_CONTACT'),
    getContactByIdAdmin
);


router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_CONTACT'),
    validateContact('updateContactById'),
    updateContactById
);

router.delete(
    '/:id',
    verifyToken,
    requiredPermissions('DELETE_CONTACT'),
    deleteContactById
);

module.exports = router;
