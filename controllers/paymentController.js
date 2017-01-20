const Payment = require("../lib/payment");
const User = require("../models/user");

class PaymentController {
    static getCharge(req, res) {
        Payment.createCharge()
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
    static getRefund(req, res) {
        Payment.createRefund()
            .then((results) => {
                res.status(200).send({})
            })
            .catch(err => {
                res.status(400).send(err.message);
            });
    }
}

module.exports = PaymentController;