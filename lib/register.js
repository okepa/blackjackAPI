const Invite = require("../models/invite");
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
        // console.log(req);
        return new Promise(
            (resolve, reject) => {
                //console log used to test what if fields have been created
                //console.log(req.body.password);
                //console.log(req.body.dob);
                //moment handles the date format fromm ISO to a normal format
                req.body.dob = moment(req.body.dob).format("YYYY/MM/DD");
                //used to generate a hash to mask the password created
                req.body.password = hash.generate(req.body.password);
                User.create(req.body, function (err, user) {
                    console.log("createUser");
                    console.log(user);
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        )

    }
    // existing member balance updated
    // cant find the existing member - how to link the existingUserId in the invite model to the _id in the users model
    static findAndUpdateBalance(req) {
        console.log("findAndUpdateBalance");
        //console.log(req.body);
        return new Promise(
            (resolve, reject) => {
                User.findByIdAndUpdate({ _id: req.body.existingUserId }, { $inc: { balance: 10 } }, function (err, user) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
    }
    // new user's (invited friend) balance show start at 10
    static newUserBalance(req) {
        console.log("newUserBalance - method");
        //console.log(req.body.email);
        return new Promise(
            (resolve, reject) => {
                Invite.findOne({ friendEmail: req.body.email }, function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        //console.log("are you working");
                         console.log(res);
                        //console.log(res.body.friendEmail);
                        if (res) {
                            console.log("existing userid");
                            console.log(res.existingUserId);
                            console.log("first resolve");
                            User.findOneAndUpdate({ email: res.friendEmail }, { $set: { balance: 10 } }, function (err, res) {
                                resolve(res);
                            });
                        } else {
                            console.log("second resolve");
                            resolve();
                        }
                    }



                })
            })

    }
}

module.exports = Registration;
