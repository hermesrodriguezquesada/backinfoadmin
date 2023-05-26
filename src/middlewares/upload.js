const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const path = require('path');
const {PLANS_LOCATION, IMAGES_LOCATION} = require('../utils/globalUtils');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'studyPlan') {
            cb(null, PLANS_LOCATION);
        } else if (file.fieldname === 'image' || file.fieldname === 'logo' || file.fieldname === 'rectorImage') {
            cb(null, IMAGES_LOCATION);
        }
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    },
});

const maxSize = 5 * 1024 * 1024; // for 5MB

module.exports = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'image' || file.fieldname === 'logo' || file.fieldname === 'rectorImage') {
            if (
                file.mimetype === "image/svg+xml" ||
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) {
                cb(null, true);
            } else {
                //cb(null, false);
                return cb(new Error("Only .svg .png, .jpg and .jpeg format allowed!"));
            }
        } else if (file.fieldname === 'studyPlan') {
            if (file.mimetype === "application/pdf") {
                cb(null, true);
            } else {
                //cb(null, false);
                return cb(new Error("Only .pdf format allowed!"));
            }
        }
    },
    limits: {fileSize: maxSize},
});
