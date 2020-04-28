const express = require("express");
require("express-namespace");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(
    session({
        secret: "wonderfulSecretCode",
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/public", express.static(`${__dirname}/public`));

require("./routes/routes")(app, passport);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server started");
});
