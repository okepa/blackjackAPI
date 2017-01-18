const User = require("../models/user");
const hash = require("password-hash");
const loginLib = require("../lib/loginLib");

class LoginController {
    /**
    * This is a description
    * @method login
    * @param {String} req - req.body.username && eq.body.password
    * @param {String} res - string
    * @return {Object} return token object
    */

    static login(req, res) {
        //console.log(req.body.username);
        //call login function in lib folder with para of req.body.username
        loginLib.loginUser(req).then(result => {
            res.status(200).send({
                success: { token: result.token, id:result.id }
            })
        })
        .catch(err=>{
                console.log(err);
                res.status(401).send(err);
        })

    }
}

module.exports = LoginController;
