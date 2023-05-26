const {Router} = require('express');
const router = Router();

const verifyToken = require('../../middlewares/authJwt');
const requiredPermissions = require('../../middlewares/permissions');
const upload = require('../../middlewares/upload');

const {
    validateNews, createNews, getNewsAdmin, getNewsByIdAdmin, updateNewsById, deleteNewsById,
} = require('../../controllers/news.controller');

router.post(
    '/',
    verifyToken,
    requiredPermissions('CREATE_NEWS'),
    upload.single('image'),
    validateNews('createNews'),
    createNews
);

router.get(
    '/',
    verifyToken,
    requiredPermissions('READ_NEWS'),
    getNewsAdmin
);

router.get(
    '/:id',
    verifyToken,
    requiredPermissions('READ_NEWS'),
    getNewsByIdAdmin
);


router.put(
    '/:id',
    verifyToken,
    requiredPermissions('UPDATE_NEWS'),
    upload.single('image'),
    validateNews('updateNewsById'),
    updateNewsById
);

router.delete(
    '/:id',
    verifyToken,
    requiredPermissions('DELETE_NEWS'),
    deleteNewsById
);

module.exports = router;
