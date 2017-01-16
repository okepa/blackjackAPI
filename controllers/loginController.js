const user = require("../models/userModel");
const hash = require("password-hash");
const jwt = require("jsonwebtoken");

class LoginController {
    /**
    * This is a description
    * @method login
    * @param {String} req - req.body.username && eq.body.password
    * @param {String} res - string
    * @return {Object} return token object
    */

    static login(req, res) {
        // query database for username
        user.findOne({ username: req.body.username }, (err, user) => {

            // checking that entered password = saved password
            if (user && verifyPassword(req.body.password)) {
                // create token
                let token = jwt.sign(user, "blackJackUserToken", {
                    expiresIn: "4h"
                });
                // send back created token = success
                res.status(200).send({
                    success: { token: token }
                });
            }
            else {
                // send back error message = failure
                if (err) req.status(401).send({
                    err: "Please check you crudentials and try again"
                });
            }
        })
    }

}
/**
* This is a description
* @method verifyPassword
* @param {String} inputPassword
* @param {String} hashedPassword
* @return {Object} return true or false (password match)
*/

function verifypassword(inputPassword, hashedPassword) {
    // hash.verify check to see if the front-end password enter(unhashed) matches the protected(hashed) password in the back-end
    return hash.verify(inputPassword, hashedPassword);
    //return true or false

}