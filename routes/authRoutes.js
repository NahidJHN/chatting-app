const router = require("express").Router();
const {
    registerGetController,
    registerPostController,
    loginPostController,
} = require("../controllers/authController");
const avaterUpload = require("../middlewares/fileUpload");
const {
    registerValidation,
    addUserValidationHandaler,
} = require("../validators/userValidation");

router.get("/login", registerGetController);
router.post("/login", loginPostController);

router.post(
    "/register",
    avaterUpload,
    registerValidation,
    registerValidation,
    addUserValidationHandaler,
    registerPostController
);
module.exports = router;
