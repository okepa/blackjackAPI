const User = require("../models/user");
const stripe = require("stripe")(
  "sk_test_TE7LaOrh5H7zHEUu53PNwe7a"
);

class Charge {
  //this method charges a users card using stripe
  static createCharge(amount, source) {
    return new Promise(
      (reject, resolve) => {
        stripe.charges.create({
          amount: amount,
          currency: "gbp",
          source: source, // obtained with Stripe.js
          description: null
        }, function (err, charge) {
          if(err) {
            reject(err)
          } else {
            resolve(charge);
          }
        });
      }
    )
  }
  //stores the new balnace into the datebase of user information
  static updateDatabase() {
    return new Promise(
      (reject, resolve) => {

      }
    )
  }


}

module.exports = Charge;