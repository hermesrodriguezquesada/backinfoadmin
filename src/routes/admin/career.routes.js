const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const upload = require('../../middlewares/upload');
const requiredPermissions = require('../../middlewares/permissions');

const {
    getCareersAdmin, getCareerByIdAdmin, validateCareer, updateCareerById, cleanCareerById
} = require('../../controllers/career.controller');

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_CAREERS'),
    getCareersAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_CAREERS'),
    getCareerByIdAdmin
);

router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_CAREER'),
    upload.single('studyPlan'),
    validateCareer('updateCareerById'),
    updateCareerById
);

router.put(
    '/:id/clean',
    verifyToken,
    requiredPermissions('UPDATE_CAREER'),
    cleanCareerById
);

module.exports = router;
