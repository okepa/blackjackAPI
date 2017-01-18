const jwt = require("jsonwebtoken");
const User = require("../models/user");
//Here is where you put the actual database get or create etc.
class Email {
    static checkValidation(token, user) {
        return new Promise(
            (resolve, reject) => {
                //use jwt token verify                
                jwt.verify(token, "emailValidation", (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        User.findOneAndUpdate({"username": user}, { $set: {access: true}}, function (err, user) {
                             console.log("Trying to insert");
                             if (err){
                                reject(err);
                             } else {
                                resolve();
                             }
                            resolve();
                        });
                    }
                })
            })
    }
}

module.exports = Email;