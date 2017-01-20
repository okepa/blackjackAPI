const User = require("../models/user");
const stripe = require("stripe")(
  "sk_test_TE7LaOrh5H7zHEUu53PNwe7a"
);

class Payment {
  //this method charges a users card using stripe
  static createCharge(amount, source) {
    return new Promise(
      (reject, resolve) => {
        stripe.charges.create({
          amount: amount,
          currency: "gbp",
          source: source, // obtained with Stripe.js
          description: null
        }, function (err, charge, source) {
          if (err) {
            reject(err)
          } else {
            let resolveArray = [charge.amount, source];
            resolve(resolveArray);
          }
        });
      }
    )
  }
  //stores the new balnace into the datebase of user information
  static updateDatabase(resolveArray) {
    return new Promise(
      (reject, resolve) => {
        User.findOneAndUpdate( resolveArray[1], { $inc: { balance: resolveArray[0] } }, function (err, res) {
          if(err){
            reject(err);
          } else {
            resolve();
          }
        });
      }
    )
  }


}

module.exports = Charge;