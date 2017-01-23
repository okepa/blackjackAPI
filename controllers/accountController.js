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
                console.log(err);
                res.status(400).send(err.message);
            });
    }

    static deleteAccDetails(req, res) {
        console.log("deleteAccDetails - controller function");
        //1. query db => resolve account balance
        Account.retrieveAccBalance(req)
            .then((refundAccountDetails) => {//result = account balance
                //2. refund to strip account(res.balance)
                Account.refundMoney(refundAccountDetails)
            })
            // .then(() => {
            //     //3. delete account
            //     Account.removeAccDetails(req)
            // })
            .then(() => {
                res.status(200).send({
                    success: "Your Balance has been refund to your Account & your Membership/Account has been deleted"
                })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send(err.message);
                    });
            })
    }
}

module.exports = AccountController;