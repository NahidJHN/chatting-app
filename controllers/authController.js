const User = require("../model/User");
const bcrypt = require("bcrypt");
const registerGetController = (req, res, next) => {
    res.render("pages/login");
};

const registerPostController = async (req, res, next) => {
    let newUser;
    let hash = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.lenght > 0) {
        newUser = new User({
            ...req.body,
            password: hash,
            avatar: req.file.filename,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hash,
        });
    }

    try {
        const user = await newUser.save();
        res.status(200).json({
            message: "User Created Successfully",
        });
    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occured",
                },
            },
        });
    }
};
module.exports = { registerGetController,registerPostController };
