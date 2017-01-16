const User = require("../models/user");
const hash = require("password-hash");
const moment = require("moment");
const Registration = require("../lib/register");

class RegisterController {

    static initUser(req, res) {
        Registration.newUser()
            .then((results) => {
                res.status(200).send({

                })
                    .catch((err) => {
                        res.status(400).send(err.message);
                    });
            })
    }

    static makeUser(req, res) {
        Registration.createUser(req)
            .then((result) => {
                res.status(201).send({
                    success: "user has been created"
                })
            })
            .catch((err) => {
                res.status(400).send(err.message);
            });
    }
}

module.exports = RegisterController;

