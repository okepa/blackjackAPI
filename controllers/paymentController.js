const User = require("../models/user");
const Payment = require("../lib/payment");

class PaymentController {

    static getCharge(req, res) {
        Payment.createCharge()
            .then((resolveArray) => {
                Payment.updateDatabase(resolveArray)
                    .then(() => {
                        res.status(201).send("Charge updated in the database");
                    })
                    .catch(err => {
                        res.status(400).send(err.message);
                    });
            })
    }

    static createPaymentCard(req, res) {

        Payment.addPaymentCard(req)
            .then(result => {
                res.status(200).send("added payment card");
            })
            .catch(err => {
                // console.log(err);
                res.status(400).send(err);
            });

    }

}

module.exports = PaymentController;



