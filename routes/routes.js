const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");
const accountValidationController = require("../controllers/accountValidationController");

//router.get("/", indexController.showIndex);

router.route("/register")
    .get(registerController.sendContactRequest)

router.route("/accountvalidation/:userid/:token")
    .get(accountValidationController.accountValidationRequest)

    //http://blackjack.herokuapp.com/userID/token

module.exports = router;