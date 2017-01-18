const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");
const accountValidationController = require("../controllers/accountValidationController");

//router.get("/", indexController.showIndex);

router.route("/register")
    .post(registerController.sendEmailRequest)

// router.route("/accountvalidation/:username/:token")
//     .get(accountValidationController.accountValidationRequest)

router.route("/accountvalidation")
    .post(accountValidationController.accountValidationRequest)

//http://blackjackapi.herokuapp.com/accountvalidation

module.exports = router;