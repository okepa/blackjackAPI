const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.route("/", indexController.showIndex);
router.route("/login", loginController);

module.exports = router;