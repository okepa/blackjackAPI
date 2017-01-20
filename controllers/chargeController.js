const Charge = require("../lib/charge");
const User = require("../models/user");

class ChargeController {
    static getCharge(req, res) {
        Charge.createCharge()
            .then((resolveArray) => {
                Charge.updateDatabase(resolveArray)
                    .then(() => {
                        res.status(201).send("Charge updated in the database");
                    })
                    .catch(err => {
                        res.status(400).send(err.message);
                    });
            })
    }
}

module.exports = ChargeController;