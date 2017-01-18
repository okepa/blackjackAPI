const User = require("../models/user");
const hash = require("password-hash");
const moment = require("moment");
const Registration = require("../lib/register");
const email = require("../lib/email");

//RegistrationController used to handle promises for connect statuses
class RegisterController {
    //handles the newUser in the register.js
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

    //handles the createUser in the register.js
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

    static sendEmailRequest(req, res) {
        //const contactRequest = new Email(req.body);
        email.sendEmail(req.body)
            .then(() => {
                res.status(200).send({
                    success: "Email has been sent"
                })
                //res.redirect("/login");
            })
            .catch(error => {
                res.status(400).send(err.message);
                //res.redirect("/login");
            });
    }
}

module.exports = RegisterController;
