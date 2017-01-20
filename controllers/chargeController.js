const Charge = require("../lib/charge");
const User = require("../models/user");

class ChargeController {
    static getCharge(req, res) {
        Charge.createCharge()
            .then(() => {
                Charge.updateDatabase(req.body)
                    .then(() => {
                        res.status(201).send
                    })
                    .catch(err => {
                        res.status(400).send(err.message);
                    });
            })
    }
}




module.exports = ChargeController;