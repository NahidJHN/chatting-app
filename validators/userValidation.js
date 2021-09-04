const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const User = require("../model/User");
const { unlink } = require("fs");
const registerValidation = [
    check("name")
        .isLength({ min: 2 })
        .withMessage("Name must have 2 character")
        .trim(),
    check("email")
        .isEmail()
        .withMessage("Invalid Email address")
        .custom(async (value) => {
            try {
                const user =await User.findOne({ email: value });
                if (user) {
                    createHttpError("This email has already in use");
                }
            } catch (error) {
                createHttpError(error.message);
            }
        }),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password must be 6 character"),
];

function addUserValidationHandaler(req, res, next) {
    const error = validationResult(req);
    const mappedError = error.mapped();
    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `../public/uploads/avatar/${filename}`),
                (err) => {
                    console.log(err);
                }
            );
        }
        res.status(500).json({
            error: mappedError,
        });
    }
}
module.exports = {registerValidation,addUserValidationHandaler};
