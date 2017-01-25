const User = require("../models/user");
const Payment = require("../lib/payment");

class PaymentController {
    static getCharge(req, res) {
        Payment.findAndRetrieveToken(req)
            .then((result) => {
                Payment.createCharge(req, result)
                    .then((resolveArray) => {
                        Payment.addChargeToDatabase(resolveArray)
                            .then(() => {
                                res.status(201).send("Charge updated in the database");
                            })
                            .catch(err => {
                                //console.log("getCharge-failure");
                                res.status(401).send(err.message);
                            });
                    })
            }
            )
    }

    static getRefund(req, res) {
        Payment.findAndRetrieveToken(req)
            .then((req, result) => {
                Payment.createRefund(req, result)
                    .then((resolveArray2) => {
                        Payment.addRefundToDatabase(resolveArray2)
                            .then(() => {
                                res.status(201).send("Refund has occurred");
                            })
                            .catch(err => {
                                res.status(401).send(err.message);
                            });
                    })
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


     static createCard(req, res) {
        Payment.addCard(req)
            .then(result => {
                res.status(200).send("added payment card");
            })
            .catch(err => {
                res.status(400).send(err);
            });
    }
}

module.exports = PaymentController;

