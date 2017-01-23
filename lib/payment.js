const User = require("../models/user");
const stripe = require("stripe")(
  process.env.STRIPE
);

class Payment {
  //this method charges a users card using stripe
  static createCharge(req) {
    return new Promise(
      (reject, resolve) => {
        stripe.charges.create({
          amount: req.body.amount,
          currency: "gbp",
          source: req.body.source, // obtained with Stripe.js
          description: null
        }, function (err, charge, source) {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            console.log(charge.amount, source);
            let resolveArray = [charge.amount, source];
            resolve(resolveArray);
            console.log(resolveArray)
          }
        });
      }
    )
  }
  //stores the new balnace into the datebase of user information
  static addChargeToDatabase(resolveArray) {
    return new Promise(
      (reject, resolve) => {
        console.log(resolveArray)
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
  static createRefund(req) {
    return new Promise(
      (reject, resolve) => {
        // let refundObj = req;
        stripe.refunds.create({
          charge: req.body.charge,
          amount: req.body.amount
        }, function (err, refund) {
          if (err) {
            reject(err)
          } else {
            let resolveArray2 = [refund.amount, chargeObj.source];
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
          console.log(req.body.id);
          console.log(req.body.source);
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

  static addPaymentCard(req) {
    return new Promise(
      (reject, resolve) => {
        console.log(req.body.id);
        console.log(req.body.source);
        User.findByIdAndUpdate({ _id: req.body.id }, { $set: { cardToken: req.body.source } }, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    )
  }
}

module.exports = Payment;