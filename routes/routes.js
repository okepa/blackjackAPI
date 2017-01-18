const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const accountController = require("../controllers/accountController");

//gets the indexController
router.route("/")
    .get(indexController.showIndex);

//gets registerjs and is implemented through the RegisterController
router.route("/register")
    .get(registerController.initUser)
    .post(registerController.makeUser);

router.route("/login")
    .post(loginController.login);

router.route("/account/:id")
    .get(accountController.showAccDetails);

    
module.exports = router;