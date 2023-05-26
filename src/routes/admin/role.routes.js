const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');

const {
    createRole, getRolesAdmin, getRoleByIdAdmin, updateRoleById, deleteRoleById, validateRole
} = require('../../controllers/role.controller');

router.post(
    '/',
    verifyToken,
    requiredPermissions('CREATE_ROLE'),
    validateRole('createRole'),
    createRole
);

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_ROLE'),
    getRolesAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_ROLE'),
    getRoleByIdAdmin
);


router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_ROLE'),
    validateRole('updateRoleById'),
    updateRoleById
);

router.delete(
    '/:id',
    verifyToken,
    requiredPermissions('DELETE_ROLE'),
    deleteRoleById
);

module.exports = router;
