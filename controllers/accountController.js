const User = require("../models/user");
const Account = require("../lib/account");

class AccountController {
    static showAccDetails(req, res) {
        Account.getAccDetails(req)
            .then(result => {
                console.log(result);
                res.status(200).send({
                    success: result
                })
            })
            .catch(err => {
                // if (!req.params.id) res.status(400).send({ error: "Please include an id" });
                console.log(err);
                res.status(400).send(err.message);
            });
    }
}

module.exports = AccountController;