const {Router} = require('express');
const router = Router();

const verifyToken = require('../middlewares/authJwt');

const {getUserByToken, changePassword, validateUser, getAllUsers} = require('../controllers/user.controller');

router.get(
    '/',
    verifyToken,
    getUserByToken
);

router.post(
    '/change-password',
    verifyToken,
    validateUser('changePassword'),
    changePassword
);

router.get(
    '/all',
    verifyToken,
    getAllUsers
);

module.exports = router;
