// const cluster = require("cluster");
//
// // Code to run if we're in the master process
// if (cluster.isMaster) {
//   // Count the machine's CPUs
//   const cpuCount = require("os").cpus().length;
//
//   // Create a worker for each CPU
//   for (let i = 0; i < cpuCount; i += 1) {
//     cluster.fork();
//   }
//
//   // Listen for terminating workers
//   cluster.on("exit", worker => {
//     // Replace the terminated workers
//     console.log("Worker " + worker.id + " died :(");
//     cluster.fork();
//   });
//
//   // Code to run if we're in a worker process
// } else {
const AWS = require("aws-sdk");
const express = require("express");
const path = require("path");

AWS.config.region = process.env.REGION;

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
// }
