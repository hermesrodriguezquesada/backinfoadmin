const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const upload = require('../../middlewares/upload');
const requiredPermissions = require('../../middlewares/permissions');

const {
    getEducationCentersAdmin,
    getEducationCenterByIdAdmin,
    validateEducationCenter,
    updateEducationCenterById,
    cleanEducationCenterById,
    cleanCareerInEducationCenter,
    updateCareerInEducationCenter,
    createEducationCenterContact,
    updateEducationCenterContact,
    deleteEducationCenterContact,
} = require('../../controllers/educationCenter.controller');

const fields = [{
    name: 'image',
    maxCount: 1
}, {
    name: 'logo',
    maxCount: 1
}, {
    name: 'rectorImage',
    maxCount: 1
}];

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_EDUCATION_CENTERS'),
    getEducationCentersAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_EDUCATION_CENTERS'),
    getEducationCenterByIdAdmin
);

router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_EDUCATION_CENTER'),
    upload.fields(fields),
    validateEducationCenter('updateEducationCenterById'),
    updateEducationCenterById
);

router.put(
    '/:id/clean',
    verifyToken,
    requiredPermissions('UPDATE_EDUCATION_CENTER'),
    cleanEducationCenterById
);

router.put(
    '/:id/clean/career',
    verifyToken,
    requiredPermissions('UPDATE_EDUCATION_CENTER'),
    validateEducationCenter('cleanCareerInEducationCenter'),
    cleanCareerInEducationCenter
);

router.put(
    '/:id/career',
    verifyToken,
    requiredPermissions('UPDATE_EDUCATION_CENTER'),
    validateEducationCenter('updateCareerInEducationCenter'),
    updateCareerInEducationCenter
);

router.post(
    '/contact',
    verifyToken,
    requiredPermissions('UPDATE_EDUCATION_CENTER'),
    validateEducationCenter('createEducationCenterContact'),
    createEducationCenterContact
);

router.put(
    '/contact/:id',
    verifyToken,
    requiredPermissions('UPDATE_EDUCATION_CENTER'),
    validateEducationCenter('updateEducationCenterContact'),
    updateEducationCenterContact
);

router.delete(
    '/contact/:id',
    verifyToken,
    requiredPermissions('UPDATE_EDUCATION_CENTER'),
    deleteEducationCenterContact
);

module.exports = router;
