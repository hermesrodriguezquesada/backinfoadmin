const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');

const {
    createUser, getUsersAdmin, getUserByIdAdmin, updateUserById, setPasswordById, deleteUserById, validateUser
} = require('../../controllers/user.controller');

router.post(
    '/',
    verifyToken,
    requiredPermissions('CREATE_USER'),
    validateUser('createUser'),
    createUser
);

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_USER'),
    getUsersAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_USER'),
    getUserByIdAdmin
);

router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_USER'),
    validateUser('updateUserById'),
    updateUserById
);

router.put(
    '/:id/set-password',
    verifyToken,
    requiredPermissions('UPDATE_USER'),
    validateUser('setPasswordById'),
    setPasswordById
);

router.delete(
    '/:id',
    verifyToken,
    requiredPermissions('DELETE_USER'),
    deleteUserById
);

module.exports = router;
