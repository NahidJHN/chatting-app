const multer = require("multer");
const { extname } = require("path");
const path = require("path");
const createError = require("http-errors");
function uploader(upload_path, file_type, file_size, error_msg) {
    const UPLOAD_FOLDER = `${__dirname}/../public/uploads/${upload_path}`;

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UPLOAD_FOLDER);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName =
                file.originalname
                    .replace(fileExt, "")
                    .toLowerCase()
                    .split(" ")
                    .join("-") + Date.now();
            cb(null, fileName + extname);
        },
    });

    const upload = multer({
        storage,
        limits: {
            fieldSize: file_size,
        },
        fileFilter: (req, file, cb) => {
            if (file_type.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(error_msg));
            }
        },
    });
    return upload;
}

module.exports = uploader;
