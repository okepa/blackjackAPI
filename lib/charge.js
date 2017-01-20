const User = require("../models/user");
const stripe = require("stripe")(
  "sk_test_TE7LaOrh5H7zHEUu53PNwe7a"
);

class Charge{
    static createCharge(){
      return new Promise(
        (reject, resolve) =>{
          
        }
      )
    }



}

module.exports = Charge;