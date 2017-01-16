const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");

router.get("/", indexController.showIndex);

module.exports = router;