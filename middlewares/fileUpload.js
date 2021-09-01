const multer = require("multer");
const uploader = require("../utils/singleUpload");

function avaterUpload(req,res,next) {
    const upload = uploader(
        "avatars"[("image/jpeg", "image/jpg", "image/png")],
        1000000,
        "Only .jpg, .jpeg, .png format always"
    );

    upload.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                error: {
                    avater: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

module.exports = avaterUpload;
