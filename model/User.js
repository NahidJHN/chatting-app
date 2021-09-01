const { Schema, model } = require("mongoose");

const userSchema = Schema(
    {
        name: {
            type: String,
            minlength: 2,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
            required: true,
        },
        password: {
            type: String,
            minlength: 6,
            required: true,
        },
        avater: {
            type: String,
        },
    },
    { timestamps: true }
);

let User = model("User", userSchema);

module.exports = User;
