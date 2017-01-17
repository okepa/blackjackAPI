//delete - testing purposes
const jwt = require('jsonwebtoken');
//In this file I need to connect 

const AccountValidation = require('../lib/accountValidation');
const User = require('../models/user');

//Here I need to get the token and userID from the route and send it to the lib file
class accountValidationController {
    static accountValidationRequest(req, res) {
        let testObj = {};
        let token = jwt.sign(testObj, "blackjack", {
            expiresIn: "12h"
        });
        let urlString = `${process.env.URL}/accountValidation?${token}`;

        let userID = "587e22de7d517dfa64044be6";

        AccountValidation.checkValidation(token, userID)
            .then((result) => {
                res.status(200).send({
                    success: "Account has been verified"
                })
            })
            .catch((err) => {
                res.status(400).send(err.message);
            });
    }
}
module.exports = accountValidationController;