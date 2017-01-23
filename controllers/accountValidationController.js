const AccountValidation = require('../lib/accountValidation');
const User = require('../models/user');

//Here I need to get the token and userID from the route and send it to the lib file
class accountValidationController {
    static accountValidationRequest(req, res) {
        // let token = jwt.sign(req.body, "emailValidation", {
        //     expiresIn: "12h"
        // });
        // let urlString = `${process.env.URL}/accountValidation?${token}`;
        //req.header.username
        //req.header.token
        AccountValidation.checkValidation(req.body.token, req.body.username)
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