const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");
const accountValidationController = require("../controllers/accountValidationController");

router.get("/", indexController.showIndex);

route.get("/accountValidation", accountValidationController.)

module.exports = router;