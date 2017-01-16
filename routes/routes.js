const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const registerController = require("../controllers/registerController");

router.get("/", indexController.showIndex);

router.route("/register")
    .get(registerController.newUser)
    .post(registerController.createUser);

module.exports = router;