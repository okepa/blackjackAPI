const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const LoginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const accountController = require("../controllers/accountController");
const accountValidationController = require("../controllers/accountValidationController");
const inviteController = require("../controllers/inviteController");
const paymentController = require("../controllers/paymentController");

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
    .post(apiCheck, inviteController.sendInviteEmail);

//gets loginjs and is implemented through the loginController
router.route("/login")
    .post(LoginController.login);

//gets accountjs and is implemented through the accountController
router.route("/account/:id")
    .get(apiCheck, accountController.showAccDetails)
    .delete(apiCheck,accountController.deleteAccDetails);

//gets accountValidation and is implemented through the accountValidationController
router.route("/accountvalidation")
    .post(apiCheck, accountValidationController.accountValidationRequest)

//gets charge and is implemented through the chargeController
router.route("/charge")
    .post(verifyToken, paymentController.getCharge)


router.route("/payment")
    .post(paymentController.createPaymentCard)

router.route("/refund")
    .post(verifyToken, paymentController.getRefund)


module.exports = router;

//user authentication
function verifyToken(req) {
    return new Promise(
        (resolve, reject) => {
            let token = req.headers['x-access-token'];

            if (token) {
                jwt.verify(token, "blackJackUserToken", function (err, decoded) {
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
/**
 * This function verifies a valid token is provided on each route
 * @param req
 * @param res
 * @param next
 */
function apiCheck(req, res, next) {
    console.log('Api Check');

    verifyToken(req)
        .then(() => {
            console.log("it works");
            next();
        })
        .catch(err => {
            console.log(err);
            return res.status(401).send({ success: false, message: err.message });
        });



}

