const express = require("express");
const path = require("path");

// load middleware
const exphbs = require("express-handlebars");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

// bring in our controllers
const controllers = require("./controllers");

// start spinning up our server
const app = express(); // create an instance of express

// define settings
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    partialsDir: path.join(__dirname, "views", "partials"),
    defaultLayout: "main"
  })
);
app.set("view engine", "hbs");
app.set("port", process.env.PORT || 8000);

// add middleware

app.use(compression());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(controllers);

module.exports = app;
