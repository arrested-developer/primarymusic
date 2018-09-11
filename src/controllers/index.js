// setup routing
const express = require("express");
const router = express.Router();

// require routes
const home = require("./home");
const error = require("./error");

// defined routes
router.get("/", home.get);

// error routes
router.use((req, res) => {
  res.status(404).render("error", { ErrorNo: "404" });
});

router.use(error);

module.exports = router;
