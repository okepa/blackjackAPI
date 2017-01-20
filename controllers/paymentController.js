const User = require("../models/user");
const Payment = require("../lib/payment");

class PaymentController {
    static createPaymentCard(req, res) {

        payment.addPaymentCard(req)
            .then(result => {
                res.status(200).send({
                    success: "Card added"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).send(err.message);
            });

    }

}


module.exports = PaymentController;



