const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");

router.get("/", indexController.showIndex);

router.route("/register")
    .get(registerController.initUser)
    .post(registerController.makeUser);

module.exports = router;