const createError = require("http-errors");

function notFoundHundle(req, res, next) {
    next(createError(404, "This requested content was not found"));
}

function errorHundle(err, req, res, next) {
    res.locals.error =
        process.env.NODE_ENV === "development" ? err : { message: err.message };

    res.status(err.status || 500);

    if (res.locals.html) {
        res.render("pages/errorPage", { title: "Not found!" });
    } else {
        res.json(res.locals.error);
    }
}

module.exports = { notFoundHundle, errorHundle };
