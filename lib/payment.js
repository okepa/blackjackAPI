const User = require("../models/user");
const stripe = require("stripe")(
  process.env.STRIPE
);

class Payment {
  //this method charges a users card using stripe
  static createCharge(req, res) {
    return new Promise(
      (reject, resolve) => {
        let chargeObj = req;
        stripe.charges.create({
          amount: req.amount,
          currency: "gbp",
          source: req.source, // obtained with Stripe.js
          description: null
        }, function (err, charge, chargeObj) {
          if (err) {
            reject(err)
          } else {
            let resolveArray = [charge.amount, chargeObj.source];
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
  static createRefund(req, res) {
    return new Promise(
      (reject, resolve) => {
        let refundObj = req;
        stripe.refunds.create({
          charge: req.charge,
          amount: req.amount
        }, function (err, refund, refundObj) {
          if (err) {
            reject(err)
          } else {
            let resolveArray2 = [charge.amount, chargeObj.source];            
            resolve(resolveArray2);
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