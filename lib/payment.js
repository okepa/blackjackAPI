const User = require("../models/user");
const stripe = require("stripe")(
  process.env.STRIPE
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
  static addChargeToDatabase(resolveArray) {
    return new Promise(
      (reject, resolve) => {
        User.findOneAndUpdate(resolveArray[1], { $inc: { balance: resolveArray[0] } }, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    )
  }

  //withdraws withdraw funds from the user's account, the payment card is refunded and balance is updated
  static createRefund() {
    return new Promise(
      (reject, resolve) => {
        stripe.refunds.create({
          amount: amount,
          currency: "gbp",
          source: source, // obtained with Stripe.js
          description: null
        }, function (err, refund, source) {
          if (err) {
            reject(err)
          } else {
            resolve(resolveArray);
          }
        });
      }
    )
  }

  static addRefundToDatabase(amount, source) {
    return new Promise(
      (reject, resolve) => {
        User.findOneAndUpdate(resolveArray[1], { $inc: { balance: parseInt(`-${resolveArray[0]}`) } }, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve();
            console.log(balance);
          }
        });
      }
    )
  }
}
module.exports = Payment;