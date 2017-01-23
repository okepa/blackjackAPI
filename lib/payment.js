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

  static addPaymentCard(req) {
    return new Promise(
      (reject, resolve) => {
        console.log (req.body.id);
        console.log (req.body.source);
        User.findByIdAndUpdate({_id :req.body.id}, {$set: {cardToken: req.body.source }}, function (err) {
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

module.exports = Payment;