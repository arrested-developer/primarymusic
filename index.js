require("dotenv").config();
const app = require("./src/app");
const colors = require("colors"); // eslint-disable-line no-unused-vars
app.listen(app.get("port"), () =>
  console.log(`Server running on port: ${app.get("port")}`.bgWhite.black.bold)
);
