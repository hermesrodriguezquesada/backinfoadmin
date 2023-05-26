const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)) {
        req.fileValidationError = 'Solo se permiten imágenes de tipo (jpg|jpeg|png|gif|svg)';
        return cb(new Error('Solo se permiten ficheros de tipo imagen'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;
