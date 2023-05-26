const {Router} = require('express');
const router = Router();
const verifyToken = require('../../middlewares/authJwt');
const {
    getPermissions
} = require('../../controllers/permission.controller');

router.get(
    '/',
    verifyToken,
    getPermissions
);

module.exports = router;
