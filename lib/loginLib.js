const user = require("../models/userModel");
const hash = require("password-hash");
const jwt = require("jsonwebtoken");

class Login {
    static loginUser(req) {
        return new Promise(
            (resolve, reject) => {
                // query database for username
                console.log("from the front end");
                console.log(req.body.username);
                user.findOne({username: req.body.username}, (err, res) => {
                    //if there's a err - reject
                    if (err) {
                        console.log("REJECTED! details were wrong");
                        reject(err);
                        //else there is a record
                    } else {
                        console.log(res);
                        //checking that entered password = saved password
                        if (res && Login.verifypassword(req.body.password)) {
                            console.log(req.body.password);
                            // create token with set criteria
                            console.log("SUCCESS, TOKEN CREATED");
                            console.log(res);
                            let token = jwt.sign(res, "blackJackUserToken", {
                                expiresIn: "4h"
                            });
                            // resolve the token
                            resolve(token);
                        } else {
                            reject("User does not exist");
                        }
                    }
                })
            });
    }

     static verifypassword(inputPassword, hashedPassword) {
        // hash.verify check to see if the front-end password enter(unhashed) matches the protected(hashed) password in the back-end
         //return hash.verify(inputPassword, hashedPassword);
         return true;
         //return true or false
     }
}

module.exports = Login;
