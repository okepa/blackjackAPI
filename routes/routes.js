const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const LoginController = require("../controllers/loginController");

router.route("/")
.get(indexController.showIndex);
router.route("/login")
        .post(LoginController.login);

module.exports = router;