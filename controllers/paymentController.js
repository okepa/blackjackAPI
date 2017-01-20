const User = require("../models/user");
const Payment = require("../lib/payment");

class PaymentController {
    static getCharge(req, res) {
        Payment.createCharge()
            .then((resolveArray) => {
                Payment.addChargeToDatabase(resolveArray)

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
            .then((resolveArray2) => {
                Charge.addRefundToDatabase(resolveArray2)
                    .then(() => {
                        res.status(201).send("Refund has occurred");
                    })
                    .catch(err => {
                        res.status(401).send(err.message);
                    });
            })
    }
    static createPaymentCard(req, res) {

        Payment.addPaymentCard(req)
            .then(result => {
                res.status(200).send("added payment card");
            })
            .catch(err => {
                res.status(400).send(err);
            });

    }

}


module.exports = PaymentController;

