//mongoose look up
//find person by id
//sends a promise back depending on result
//send result to controller 
const User = require("../models/user");
const stripe = require("stripe")(
    "sk_test_TE7LaOrh5H7zHEUu53PNwe7a"
);

class Account {
    static getAccDetails(req) {
        return new Promise(
            (resolve, reject) => {
                User.findById({_id: req.params.id }, { password: 0 }, (err, user) => {
                    if (err) reject(err);
                    if (!user) reject("User not found");
                    resolve(user);
                });
            }
        )
    }


    //step 1 for refundedMoney & close Account => (query database for balance)
    static retrieveAccBalance(req) {
        console.log("retrieveAccBalance");
        return new Promise(
            (resolve, reject) => {
                User.findById({ _id: req.params.id }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.balance == 0) {
                            resolve();
                        } else {
                            let refundAccountDetailsArray = [result.cardToken,result.balance];
                            console.log(refundAccountDetailsArray);
                            console.log("result from user account");
                            resolve(refundAccountDetailsArray);
                        }
                    }
                })
            })
    }


    //step 2 for refundedMoney & close Account => refund money => stripe Account
    static refundMoney(result) {
        console.log("refundMoney")
        return new Promise(
            (resolve, reject) => {
                console.log(result);
                stripe.refunds.create({
                    charge: result[0],  
                    amount: result[1]
                }, function (err, refund) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log("Your balance" + refund);
                        resolve();
                    }
                    // asynchronously called
                });

            })
    }


    //step 3 for refundedMoney & close Account => delete account from delete
    // static removeAccDetails(req) {
    //     console.log("removeAccDetails");
    //     console.log(req.params.id);
    //     return new Promise(
    //         (resolve, reject) => {
    //             User.findByIdAndRemove({ _id: req.params.id }, (err, user) => {
    //                 if (err) {
    //                     reject(err);
    //                 } else {
    //                     resolve();
    //                 }
    //             });
    //         })
    // }
}

module.exports = Account;
