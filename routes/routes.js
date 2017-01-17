const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");

//gets the indexController
router.get("/", indexController.showIndex);

//gets registerjs and is implemented through the RegisterController
router.route("/register")
    .get(registerController.initUser)
    .post(registerController.makeUser);

module.exports = router;