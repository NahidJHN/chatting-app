const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
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

const loginPostController = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const checkPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (checkPassword) {
                let userObject = {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar || "",
                    isLoggedIn: true,
                };

                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY,
                });

                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true,
                });

                res.status(200).json(userObject);
            } else {
                res.status(401).json({
                    error: {
                        msg: "Password doesnot match",
                    },
                });
            }
        } else {
            res.status(401).json({
                error: {
                    msg: "Email doesnot match any account",
                },
            });
        }
    } catch (error) {
        console.log(error);
    }
};
module.exports = { registerGetController,registerPostController,loginPostController };
