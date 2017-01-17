const jwt = require("jsonwebtoken");
const User = require("../models/user");
//Here is where you put the actual database get or create etc.

class Email {
    static checkValidation(token, userID) {
        return new Promise(
            (resolve, reject) => {
                //use jwt token verify
                jwt.verify(token, "blackjack", (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        //req.decoded = decoded;
                        console.log(userID);
                        User.findByIdAndUpdate(userID, { $set: {access: true}}, function (err, user) {
                            console.log("Trying to insert");
                            if (err) reject(err);
                            resolve();
                        });
                    }
                })
            })
    }
}

module.exports = Email;