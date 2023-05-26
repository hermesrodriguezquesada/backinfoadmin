const {Router} = require('express');
const router = Router();
const {ContactType, Contact, Section, News, EducationCenter, Career, Role, Permission, User, Student} = require('../database/models');
const multer = require('multer');
const mimeTypes = require('mime-types');
//const path = require('path');
const helpers = require('./helpers.js');

const {responseTypes, standardResponse} = require('../utils/globalUtils');


router.get('/get-sections', async (req, res) => {
    const items = await Section.findAll();
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-news', async (req, res) => {
    const items = await News.findAll({
        include: [Section]
    });
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-education-centers', async (req, res) => {
    const items = await EducationCenter.findAll({
        include: [Career]
    });
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-careers', async (req, res) => {
    const items = await Career.findAll({
        include: [EducationCenter]
    });
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-roles', async (req, res) => {
    const items = await Role.findAll({
        include: [User, Permission]
    });
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-permissions', async (req, res) => {
    const items = await Permission.findAll({
        include: [Role]
    });
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-users', async (req, res) => {
    const items = await User.findAll({
        include: [{
            model: Role,
            include: [Permission]
        }]
    });
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-contact-types', async (req, res) => {
    const items = await ContactType.findAll();
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-contacts', async (req, res) => {
    const items = await Contact.findAll({
        include: [ContactType]
    });
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

router.get('/get-students', async (req, res) => {
    const items = await Student.findAll();
    standardResponse(responseTypes._200_SUCCESS, "", items, res);
});

// ****** START upload file example  START ****** //

router.post('/upload_test', (req, res) => {
    const storage = multer.diskStorage({
        destination: 'public/uploads/',
        filename: function (req, file, cb) {
            cb("", Date.now() + "." + mimeTypes.extension(file.mimetype));
        }
    });

    // fieldImage se asocia al nombre del input que envía el fichero desde el formulario html
    let upload = multer({storage: storage, fileFilter: helpers.imageFilter}).single("fieldImage");

    upload(req, res, function (err) {
        // req.file contiene información del fichero subido
        // req.body contiene información de los campos de tipo texto que se envian en la petición

        if (req.fileValidationError) {
            standardResponse(responseTypes._400_BADREQUEST, "", req.fileValidationError, res);
        } else if (!req.file) {
            standardResponse(responseTypes._400_BADREQUEST, "", {message: 'Por favor seleccione una imágen para subir'}, res);
        } else if (err instanceof multer.MulterError) {
            standardResponse(responseTypes._400_BADREQUEST, "", err, res);
        } else if (err) {
            standardResponse(responseTypes._400_BADREQUEST, "", err, res);
        }

        const data = {"filePath": req.file.path, "message": "Fichero subido correctamente"};
        standardResponse(responseTypes._200_SUCCESS, "", data, res);
    });
});
// // ****** END upload file example  END ****** //

module.exports = router;
