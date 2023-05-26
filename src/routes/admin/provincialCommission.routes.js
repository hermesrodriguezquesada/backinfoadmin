const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');

const {
    validateProvincialCommission, createProvincialCommission, getProvincialCommissionsAdmin, getProvincialCommissionByIdAdmin, updateProvincialCommissionById, deleteProvincialCommissionById,
} = require('../../controllers/provincialCommission.controller');

router.post(
    '/',
    verifyToken,
    requiredPermissions('CREATE_PROVINCIAL_COMMISSION'),
    validateProvincialCommission('createProvincialCommission'),
    createProvincialCommission
);

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_PROVINCIAL_COMMISSION'),
    getProvincialCommissionsAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_PROVINCIAL_COMMISSION'),
    getProvincialCommissionByIdAdmin
);

router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_PROVINCIAL_COMMISSION'),
    validateProvincialCommission('updateProvincialCommissionById'),
    updateProvincialCommissionById
);

router.delete(
    '/:id',
    verifyToken,
    requiredPermissions('DELETE_PROVINCIAL_COMMISSION'),
    deleteProvincialCommissionById
);

module.exports = router;
