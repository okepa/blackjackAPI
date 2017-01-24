const User = require("../models/user");
const Payment = require("../lib/payment");

class PaymentController {
    static getCharge(req, res) {
        Payment.findAndRetrieveToken(req)
            .then((result) => {
                console.log("result before create charge: " + result);
                Payment.createCharge(req, result)
            })
            .then((resolveArray) => {
                console.log("resolveArray before add charge to database: " + result);
                console.log(resolveArray);
                Payment.addChargeToDatabase(resolveArray)
            })
            .then(() => {
                res.status(201).send("Charge updated in the database");
            })
            .catch(err => {
                res.status(401).send(err);
            });


    }
    //just database
    // static getCharge(req, res) {
    //     Payment.findAndRetrieveToken(req)
    //         .then((result) => {
    //             //Payment.createCharge(req, result)
    //             //.then((resolveArray) => {
    //             Payment.addChargeToDatabase(req, result)
    //                  })
    //                 .then( () => {
    //                     console.log("charge updated");
    //                     res.status(201).send({sucess: "Charge updated in the database"});
    //                 })
    //                 .catch(err => {
    //                     res.status(401).send(err);
    //                 });
    //             //})

    // }

    static getRefund(req, res) {
        Payment.findAndRetrieveToken(req)
            .then((result) => {
                console.log(result);
                Payment.createRefund(req, result)
            })
            .then((resolveArray2) => {
                console.log(resolveArray2);
                Payment.addRefundToDatabase(resolveArray2)
            })
            .then(() => {
                res.status(201).send("Refund has occurred");
            })
            .catch(err => {
                res.status(401).send(err);
            });


    }
    //just database
    // static getRefund(req, res) {
    //     Payment.findAndRetrieveToken(req)
    //         .then((result) => {
    //             //Payment.createRefund(req, result)
    //             //  .then((resolveArray2) => {
    //             Payment.addRefundToDatabase(req, result)
    //         })
    //         .then(() => {
    //             console.log("Refund has occ");
    //             res.status(200).send({
    //                 success: "Refund has occured"
    //             })
    //         })
    //         .catch(err => {
    //             res.status(401).send(err);
    //         });
    //     //})
    //}


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

