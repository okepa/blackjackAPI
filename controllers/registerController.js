const User = require("../models/user");
const hash = require("password-hash");
const moment = require("moment");

class RegisterController {

    static newUser(req, res) {
        // create an empty post
        let newUser = {
            id: "",
            fullName: "",
            email: "",
            username: "",
            password: "",
            dob: ""
        }
        //find correct render from blackjackgui
        //   res.render("" , {
        //     title: "",
        //     user: newUser
        //   });
        res.send();
    }

    static createUser(req, res) {
        console.log(req.body.password);
        console.log(req.body.dob);
        // req.body.dob = new Date(req.body.dob);
        req.body.dob = moment(req.body.dob).format("YYYY/MM/DD");
        req.body.password = hash.generate(req.body.password);
        User.create(req.body, function (err, user) {
            // check for errors and return 500 if there was a problem
            if (err) return res.status(500).send(err);

            // redirect the user to a GET route. We'll go back to the INDEX.
            // res.redirect("/");
            res.send();

        });

    }
}

module.exports = RegisterController;