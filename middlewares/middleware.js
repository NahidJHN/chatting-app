const express = require("express");

let middleware = [
    express.static("public"),
    express.urlencoded({ extended: true }),
    express.json(),
];

module.exports = (app) => {
    app.use(middleware);
};
