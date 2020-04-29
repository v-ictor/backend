const multer = require('multer');
const path = require('path');
const {v4:uuidv4} = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/images/img'),
    filename: (req, file, cb) => {
        cb(null, uuidv4()+path.extname(file.originalname).toLocaleLowerCase());
    }
})

exports.upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileType = /jpeg|jpg|png|JPEG|JPG|PNG/;
        const mimetype = fileType.test(file.mimetype);
        const extname = fileType.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true);
        } else {
            cb('Error: La carga de archivos solo admite los siguientes tipos de archivos - '+fileType);
        }
    }
});