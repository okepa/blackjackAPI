const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const LoginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const accountController = require("../controllers/accountController");
const accountValidationController = require("../controllers/accountValidationController");
const inviteController = require("../controllers/inviteController");
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
    .post(verifyToken, inviteController.sendInviteEmail);

//gets loginjs and is implemented through the loginController
router.route("/login")
    .post(LoginController.login);

//gets accountjs and is implemented through the accountController
router.route("/account/:id")
    .get(verifyToken, accountController.showAccDetails);

//gets accountValidation and is implemented through the accountValidationController
router.route("/accountvalidation")
    .post(verifyToken, accountValidationController.accountValidationRequest)

router.route("/charge")
    .post(chargeController.getCharge)

module.exports = router;

//user authentication
function verifyToken(req) {
    return new Promise(
        (resolve, reject) => {
            let token = req.session.token || req.headers['x-access-token'];


            if (token) {
                jwt.verify(token, "epicHRauth", function (err, decoded) {
                    if (err) {
                        reject(err);
                    } else {
                        req.decoded = decoded;
                        resolve();
                    }
                });
            } else {
                reject({
                    success: false,
                    message: "No token provided"
                });
            }
        }
    )
}
