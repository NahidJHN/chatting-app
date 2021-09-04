require("dotenv").config();
const express = require("express");
const { errorHundle, notFoundHundle } = require("./middlewares/errorHundle");
const app = express();
app.set("view engine", "ejs");
const authRouter = require("./routes/authRoutes");
const setMiddlewres = require("./middlewares/middleware");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
//use middlewares from middlewares directory

// setMiddlewres(app);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(authRouter);

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
