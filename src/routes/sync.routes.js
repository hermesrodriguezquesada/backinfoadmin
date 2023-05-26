const {Router} = require('express');
const router = Router();
const verifyToken = require('../middlewares/authJwt');
const requiredPermissions = require('../middlewares/permissions');
const {
    syncActiveProcess,
    syncScienceAreas,
    syncCareers,
    syncProvinces,
    syncEducationCenters,
    syncIncomeSources,
    syncPlacePlans,
    syncPlacePlansByProvince,
    syncStudents,
    syncComplete,
    syncCommissions,
    syncMunicipalities,
    syncPreuniversities,
    syncEducationCenterCareers,
    getSyncronizationsAdmin,
    getSyncronizationByIdAdmin,
    getSyncStatus
} = require('../controllers/sync.controller');

router.get(
    '/syncActiveProcess',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncActiveProcess
);

router.get(
    '/syncScienceAreas',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncScienceAreas
);

router.get(
    '/syncCareers',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncCareers
);

router.get(
    '/syncProvinces',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncProvinces
);

router.get(
    '/syncEducationCenters',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncEducationCenters
);

router.get(
    '/syncIncomeSources',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncIncomeSources
);

router.get(
    '/syncPlacePlans',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncPlacePlans
);

router.get(
    '/syncPlacePlansByProvince/:id',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncPlacePlansByProvince
);

router.get(
    '/syncStudents',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncStudents
);

router.get(
    '/syncComplete',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncComplete
);

router.get(
    '/syncCommissions',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncCommissions
);

router.get(
    '/syncMunicipalities',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncMunicipalities
);

router.get(
    '/syncPreuniversities',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncPreuniversities
);

router.get(
    '/syncEducationCenterCareers',
    verifyToken,
    requiredPermissions('CREATE_SYNC'),
    syncEducationCenterCareers
);

router.get(
    '/getSyncronizationsAdmin',
    verifyToken,
    requiredPermissions('GET_SYNC'),
    getSyncronizationsAdmin
);

router.get(
    '/getSyncronizationByIdAdmin/:id',
    verifyToken,
    requiredPermissions('GET_SYNC'),
    getSyncronizationByIdAdmin
);

router.get(
    '/getSyncStatus',
    verifyToken,
    requiredPermissions('GET_SYNC'),
    getSyncStatus
);

module.exports = router;
