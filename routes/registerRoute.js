const router = require("express").Router();
const {
    registerGetController,
    registerPostController,
} = require("../controllers/authController");
const avaterUpload = require("../middlewares/fileUpload");
const {
    registerValidation,
    addUserValidationHandaler,
} = require("../validators/userValidation");

router.get("/login", registerGetController);

router.post(
    "/register",
    avaterUpload,
    registerValidation,
    registerValidation,
    addUserValidationHandaler,
    registerPostController
);
module.exports = router;
