require("dotenv")
const express = require("express");
const { errorHundle, notFoundHundle } = require("./middlewares/errorHundle");
const app = express();
app.set("view engine", "ejs");
const authRouter = require("./routes/registerRoute");
const setMiddlewres = require("./middlewares/middleware");
const mongoose = require("mongoose");

//use middlewares from middlewares directory

setMiddlewres(app);
app.use(authRouter);

app.get("/login", (req, res) => {
    res.render("pages/login");
});

app.use(notFoundHundle);
app.use(errorHundle);

const MONGO_URI = " mongodb://127.0.0.1:27017/chatAppication";
const PORT = process.env.PORT || 8080;
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database Connect Successful");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((e) => {
        console.log("Database connection failed");
        console.log(e);
    });
