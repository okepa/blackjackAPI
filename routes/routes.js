const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const accountController = require("../controllers/accountController");
const accountValidationController = require("../controllers/accountValidationController");
const inviteController = require("../controllers/inviteController");
const paymentController = require("../controllers/paymentController");
const tokenAuthenicationController = require("../controllers/tokenAuthenicationController");
const jwt = require('jsonwebtoken');

//gets the indexController
router.route("/")
    .get(indexController.showIndex);

//gets registerjs and is implemented through the RegisterController
router.route("/register")
    .get(registerController.initUser)
    .post(registerController.makeUser);

//gets invitejs and is implemented through the inviteController
router.route("/invite")
    .post(tokenAuthenicationController.apiCheck, inviteController.sendInviteEmail);

//gets loginjs and is implemented through the loginController
router.route("/login")
    .post(loginController.login);

//gets accountjs and is implemented through the accountController
router.route("/account/:id")
    .get(tokenAuthenicationController.apiCheck, accountController.showAccDetails)
    .delete(tokenAuthenicationController.apiCheck, accountController.deleteAccDetails);

//gets accountValidation and is implemented through the accountValidationController
router.route("/accountvalidation")
    .post(accountValidationController.accountValidationRequest)

//gets charge and is implemented through the chargeController
router.route("/charge")
    .post(tokenAuthenicationController.apiCheck, paymentController.getCharge)

//gets payment and is implemented through the paymentController
router.route("/payment")
    .post(tokenAuthenicationController.apiCheck, paymentController.createPaymentCard)

//gets refund and is implemented through the tokenAuthenticationController
router.route("/refund")
    .post(tokenAuthenicationController.apiCheck, paymentController.getRefund)

module.exports = router;




