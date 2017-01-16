const User = require("../models/user");
const hash = require("password-hash");
const moment = require("moment");

class Registration {
    static newUser() {
        return new Promise(
            (resolve, reject) => {
                // let newUser = {
                //     id: "",
                //     fullName: "",
                //     email: "",
                //     username: "",
                //     password: "",
                //     dob: ""
                // }
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    }

    static createUser(req) {
        return new Promise(
            (resolve, reject) => {
                console.log(req.body.password);
                console.log(req.body.dob);
                req.body.dob = moment(req.body.dob).format("YYYY/MM/DD");
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


// static generateString(){
//        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
//        let token = '';
//        for (let i = 0; i < 16; i++) {
//            token += chars[Math.round(Math.random() * (chars.length - 1))];
//        }
//        let urlString = `${process.env.URL}/accountValidation?${token}`;
       
//        return urlString;
//    }