const Payment = require("../lib/payment");
const User = require("../models/user");

class PaymentController {
    static getCharge(req, res) {
        Payment.createCharge()
            .then((resolveArray) => {
                Charge.addChargeToDatabase(resolveArray)
                    .then(() => {
                        res.status(201).send("Charge updated in the database");
                    })
                    .catch(err => {
                        res.status(401).send(err.message);
                    });
            })
    }
    static getRefund(req, res) {
        Payment.createRefund()
            .then((resolveArray) => {
                Charge.addRefundToDatabase(resolveArray)
                    .then(() => {
                        res.status(201).send("Refund has occurred");
                    })
                    .catch(err => {
                        res.status(401).send(err.message);
                    });
            })
    }
}

module.exports = PaymentController;