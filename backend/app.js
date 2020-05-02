const express = require("express");
require("express-namespace");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({}));
app.use(
    session({
        secret: "wonderfulSecretCode",
    })
);
app.use("/public", express.static(`${__dirname}/public`));

require("./routes/routes")(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log("Server started");
});
