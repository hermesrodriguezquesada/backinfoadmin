const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');

const {
    validateSection, getSectionsAdmin, getSectionByIdAdmin, updateSectionById,
} = require('../../controllers/section.controller');

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_SECTION'),
    getSectionsAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_NEWS'),
    getSectionByIdAdmin
);


router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_SECTION'),
    validateSection('updateSectionById'),
    updateSectionById
);

module.exports = router;
