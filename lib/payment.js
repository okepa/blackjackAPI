const User = require("../models/user");
const stripe = require("stripe")(
  process.env.STRIPE
);

class Payment {

  // static proxyCard() {
  //   return new Promise(
  //     (resolve, reject) => {
  //       stripe.tokens.create({
  //         card: {
  //           "number": '4242424242424242',
  //           "exp_month": 12,
  //           "exp_year": 2018,
  //           "cvc": '123'
  //         }
  //       }, function (err, cardToken) {
  //         if(err){
  //           reject(err)
  //         }else {
  //           console.log(cardToken);
  //           resolve(cardToken);
  //         }
  //       });
  //     }
  //   )
  // }


  static findAndRetrieveToken(req) {
    console.log("retrieveAccBalance");
    console.log("amount:")
    console.log(req.body.amount);
    return new Promise(
      (resolve, reject) => {
        User.findById({ _id: req.body.id }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        })
      })
  }


  //this method charges a users card using stripe
  static createCharge(req, result) {
    console.log("Create charge");
    return new Promise(
      (reject, resolve) => {
        console.log("amount:")
        console.log(req.body.amount);
        console.log("card: ");
        console.log(result.cardToken);
        //let stripeMoney = req.body.amount * 100;
        stripe.charges.create({
          amount: req.body.amount,
          currency: "gbp",
          source: result.cardToken, // obtained with Stripe.js
          description: "The card has been charged"
        }, function (err, charge) {
          if (err) {
            console.log("Fails create charge");
            reject(err)
          } else {
            console.log("Passes create charge");
            let resolveArray = [charge.amount, result.id];
            resolve(resolveArray);
          }
        });
      }
    )
  }
  //stores the new balance into the datebase of user information
  static addChargeToDatabase(resolveArray) {
    return new Promise(
      (reject, resolve) => {
        console.log("resolveArray in addChargeToDatabase: " + result);        
        console.log(resolveArray);
        User.findByIdAndUpdate(resolveArray[1], { $inc: { balance: resolveArray[0] } }, function (err, res) {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      }
    )
  }
  //just database
  //   static addChargeToDatabase(req, result) {
  //   return new Promise(
  //     (reject, resolve) => {
  //       //console.log(resolveArray);
  //       User.findByIdAndUpdate(result.id, { $inc: { balance: req.body.amount } }, function (err, res) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve();
  //           console.log("findbyidandupdate worked");
  //         }
  //       });
  //     }
  //   )
  // }

  //withdraws withdraw funds from the user's account, the payment card is refunded and balance is updated
  static createRefund(req, result) {
    return new Promise(
      (reject, resolve) => {
        stripe.transfers.create({
          amount: req.body.amount,
          currency: "gbp",
          destination: result.cardToken,
          description: "Money has been transferred to card"
        }, function (err, transfer, result) {
          if (err) {
            reject(err)
          } else {
            let resolveArray2 = [transfer.amount, result.id];
            resolve(resolveArray2);
          }
        });
      }
    )
  }

  static addRefundToDatabase(resolveArray2) {
    return new Promise(
      (reject, resolve) => {
        User.findByIdAndUpdate(resolveArray2[1], { $inc: { balance: parseInt(`-${resolveArray2[0]}`) } }, function (err, res) {
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

  //just database
  //   static addRefundToDatabase(req, result) {
  //   return new Promise(
  //     (reject, resolve) => {
  //       User.findByIdAndUpdate(result.id, { $inc: { balance: parseInt(`-${req.body.amount}`) } }, function (err, res) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve();
  //         }
  //       });
  //     }
  //   )
  // }

  static addPaymentCard(req) {
    return new Promise(
      (reject, resolve) => {
        User.findByIdAndUpdate({ _id: req.body.id }, { $set: { cardToken: req.body.cardToken }}, function (err) {
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