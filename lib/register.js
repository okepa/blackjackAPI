const User = require("../models/user");
const hash = require("password-hash");
const moment = require("moment");


//Registration class that has promises to handle new and create users
class Registration {
    //promise for a new user
    static newUser() {
        return new Promise(
            (resolve, reject) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    }
    //promise to handle the creation of a new user
    static createUser(req) {
        console.log(req);
        return new Promise(
            (resolve, reject) => {
                //console log used to test what if fields have been created
                console.log(req.body.password);
                console.log(req.body.dob);
                //moment handles the date format fromm ISO to a normal format
                req.body.dob = moment(req.body.dob).format("YYYY/MM/DD");
                //used to generate a hash to mask the password created
                req.body.password = hash.generate(req.body.password);
                User.create(req.body, function (err, user) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        )

    }
}

module.exports = Registration;
