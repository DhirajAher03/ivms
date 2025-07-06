const multer = require('multer');
const path = require('path');

const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './Images')); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); 
    }
});

const photoUpload = multer({
    storage: photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
}).fields([
    { name: 'student_details', maxCount: 1 },
    { name: 'faculty_details', maxCount: 1 },
]);


const photoUpload1 = multer({
    storage: photoStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
}).array('galleryimage', 5); 


module.exports = { photoUpload,photoUpload1 };
