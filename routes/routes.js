const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const LoginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const accountController = require("../controllers/accountController");
const accountValidationController = require("../controllers/accountValidationController");

//gets the indexController
router.route("/")
    .get(indexController.showIndex);

//gets registerjs and is implemented through the RegisterController
router.route("/register")
    .get(registerController.initUser)
    .post(registerController.makeUser);

router.route("/register")
    .post(registerController.sendEmailRequest);

router.route("/login")
    .post(LoginController.login);

router.route("/account/:id")
    .get(accountController.showAccDetails);

router.route("/accountvalidation")
    .post(accountValidationController.accountValidationRequest)

module.exports = router;