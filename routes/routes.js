const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");
const accountValidationController = require("../controllers/accountValidationController");

router.get("/", indexController.showIndex);

router.get("/accountValidation", accountValidationController.accountValidationRequest);

module.exports = router;