const User = require("../models/user");
const hash = require("password-hash");
const jwt = require("jsonwebtoken");

class Login {
    static loginUser(req) {
        return new Promise(
            (resolve, reject) => {
                // query database for username
                console.log(req);
                User.findOne({ username: req.body.username }, (err, res) => {
                    //if there's a err - reject
                    if (err) {
                        //console.log(err);
                        reject(err);
                        //else there is a record
                    } else {
                        //if access is false 
                        if(res.access == false){
                            //if access if true
                          reject("Error: Please check your credentials are right");
                        } else {
                        //check the password from the front end and backend matches
                        if (res && Login.verifypassword(req.body.password, res.password) && res.access == true) {
                            //SUCCESS
                            //create token with parameters
                            let token = jwt.sign(res, "blackJackUserToken", {
                                expiresIn: "4h"
                            });
                            // SUCCESS => resolve the token
                            resolve({ token: token, id: res._id});
                        } else {
                            // FAILURE => send error message
                            reject("Error: Please check your credentials are right");
                        }
                    }
                    }
                })
            });
    }

    static verifypassword(inputPassword, hashedPassword) {
        // hash.verify check to see if the front-end password enter(unhashed) matches the protected(hashed) password in the back-end
        return hash.verify(inputPassword, hashedPassword);
    }
}

module.exports = Login;
