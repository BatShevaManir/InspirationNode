const multer = require('multer');

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);

    }

})
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {

        cb(null, true);
    }

    cb(null, false)

}
const upload = multer({
    // dest: 'upload/',
    fileFilter,
    storage
});

module.exports = upload;